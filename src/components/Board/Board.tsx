'use client';
import "./styles.css";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import ColorPickerPreview from '@/components/ColorPickerPreview/ColorPickerPreview';
import useColorPickerStore from "@/store/colorPicker";
import BoardToolbar from "../BoardToolbar/BoardToolbar";
import { clearCanvas, renderPrecissionTest } from "@/lib/utils";

const Board: React.FC = () => {

    const [showPreview, setShowPreview] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [previewData, setPreviewData] = useState<Uint8ClampedArray | null>(null);
    const [colorDropperWrapperStyles, setColorDropperWrapperStyles] = useState<CSSProperties>({
        position: 'absolute',
        transition: 'transform 20ms ease-in-out',
        left: `${0}px`,
        top: `${0}px`,
        pointerEvents: 'none',
    });

    const { previewSize, currentTool, hoveredColor, image, setCurrentTool, setCurrentColor } = useColorPickerStore((state: any) => state);

    useEffect(() => {
        canvasRef.current?.setAttribute('width', `${canvasWrapperRef.current?.clientWidth}px`);
        canvasRef.current?.setAttribute('height', `${canvasWrapperRef.current?.clientHeight}px`);
        const newCtx = canvasRef.current?.getContext("2d", { willReadFrequently: true }) ?? null;
        setCtx(newCtx);
        window.addEventListener('resize', renderImage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => renderImage(), [ctx, image]);

    const renderImage = () => {
        if (!ctx) { return; }

        clearCanvas(ctx);

        const img = new Image();
        // img.src = "/img/map.jpg";
        // img.src = "/img/6200x6200.jpg";
        img.src = image;
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = () => {

            const imgWidth = img.width * .5;
            const imgHeight = img.height * .5;
            const imgX = ctx.canvas.width as number / 2 - imgWidth / 2;
            const imgY = ctx.canvas.height as number / 2 - imgHeight / 2;
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

            renderPrecissionTest(ctx);
        };


    }

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (currentTool === 'color-picker' && showPreview) {
            setCurrentColor(hoveredColor);
            setCurrentTool(null);
        }
    };


    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!ctx) { return; }

        const rect = ctx.canvas.getBoundingClientRect() ?? { left: 0, top: 0 };
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const previewX = x - previewSize / 2;
        const previewY = y - previewSize / 2;
        const previewWidth = previewSize;
        const previewHeight = previewSize;

        setColorDropperWrapperStyles((prev) => ({
            ...prev,
            transform: `translate(${x - previewSize * 10 / 2}px, ${y - previewSize * 10 / 2}px)`,
        }));

        setPreviewData(
            ctx?.getImageData(
                previewX,
                previewY,
                previewWidth,
                previewHeight,
            ).data as Uint8ClampedArray
        );
    }

    const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
        if (!ctx) { return; }
        clearCanvas(ctx);
        const scaleFactor = 1 + e.deltaY * -0.001;
        ctx?.scale(scaleFactor, scaleFactor);
        renderImage();
    }

    return (
        <div className="board-wrapper">
            <BoardToolbar />
            <div ref={canvasWrapperRef} className="canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    className="main-canvas"
                    onMouseMove={handleMouseMove}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={() => setShowPreview(true)}
                    onMouseLeave={() => setShowPreview(false)}
                    onWheel={handleWheel}
                    style={{ cursor: currentTool === 'color-picker' && showPreview ? 'none' : 'default' }}
                ></canvas>

                {currentTool === 'color-picker' && showPreview && (
                    <div style={colorDropperWrapperStyles}>
                        <ColorPickerPreview data={previewData} size={previewSize} />
                    </div>
                )}

            </div>
        </div >
    );
}

export default Board;
