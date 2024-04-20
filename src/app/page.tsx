'use client';

import React, { useEffect, useRef, useState } from "react";
import ColorDropperPreview from "@/components/ColorDropperPreview.tas/ColorDropperPreview";

export default function Home() {

  const previewSize = 11;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [previewData, setPreviewData] = useState<Uint8ClampedArray>(new Uint8ClampedArray(20 * 20));

  const imgRef = useRef<HTMLImageElement>(new Image());

  useEffect(() => {

    loadImg();

    canvasRef.current?.setAttribute('width', '900px');
    canvasRef.current?.setAttribute('height', '600px');

    const ctx = canvasRef.current?.getContext("2d") ?? null;
    setCtx(ctx);

  }, []);

  const loadImg = () => {
    imgRef.current.src = "https://i.pinimg.com/564x/90/99/a7/9099a72884a5cc1c46ab1296546eac21.jpg";
    imgRef.current.setAttribute('crossOrigin', 'anonymous');
    imgRef.current.onload = () => {
      ctx?.drawImage(imgRef.current, 0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0);
    };
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {

    ctx?.clearRect(0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0);
    ctx?.drawImage(imgRef.current, 0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0);

    const rect = canvasRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const previewX = x - previewSize / 2;
    const previewY = y - previewSize / 2;
    const previewWidth = previewSize;
    const previewHeight = previewSize;

    previewWrapperRef.current.style.left = `${x}px`;
    previewWrapperRef.current.style.top = `${y}px`;

    // @ts-ignore
    ctx.beginPath();
    // @ts-ignore
    ctx.lineWidth = "3";
    // @ts-ignore
    ctx.strokeStyle = "red";
    // @ts-ignore
    ctx.rect(previewX - 2, previewY - 2, previewWidth + 4, previewHeight + 4);
    // @ts-ignore
    ctx.stroke();

    setPreviewData(ctx?.getImageData(previewX, previewY, previewWidth, previewHeight).data as Uint8ClampedArray);
  }

  return (
    <main>
      <div>
        <h1>Hellow World</h1>
        <canvas
          ref={canvasRef}
          style={styles.mainCanvas}
          onMouseMove={handleMouseMove}
        ></canvas>
        <div ref={previewWrapperRef} style={{ position: 'absolute' }}>
          <ColorDropperPreview data={previewData} size={previewSize} />
        </div>
      </div>
    </main>
  );
}

const styles = {
  mainCanvas: {
    width: '900px',
    height: '600px',
    border: '1px solid black',
    // display: 'block',
    // marginInline: 'auto',
  }
}