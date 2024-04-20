'use client';
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import ColorDropperPreview from '@/components/ColorDropperPreview2/ColorDropperPreview2';

const Board: React.FC = () => {

    let lastMove = 0;
    const previewSize = 11;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const previewWrapperRef = useRef<HTMLDivElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [previewData, setPreviewData] = useState<Uint8ClampedArray | null>(null);
    const [colorDropperWrapperStyles, setColorDropperWrapperStyles] = useState<CSSProperties>({});

    useEffect(() => {
        const newCtx = canvasRef.current?.getContext("2d", { willReadFrequently: true }) ?? null;
        setCtx(newCtx);
    }, []);

    useEffect(() => {
        canvasRef.current?.setAttribute('width', `${canvasWrapperRef.current?.clientWidth}px`);
        canvasRef.current?.setAttribute('height', `${canvasWrapperRef.current?.clientHeight}px`);
    }, [canvasWrapperRef]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => renderImage(), [ctx]);

    const renderImage = () => {
        if (!ctx) { return; }
        const img = new Image();
        img.src = "/img/beach.jpg";
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = () => {
            const imgWidth = img.width * .4;
            const imgHeight = img.height * .4;
            const imgX = canvasRef.current?.width as number / 2 - imgWidth / 2;
            const imgY = canvasRef.current?.height as number / 2 - imgHeight / 2;
            ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        };
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {

        const now = Date.now();
        if (now - lastMove < 1000) { return; }
        lastMove = now;

        const rect = canvasRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const previewX = x - previewSize / 2;
        const previewY = y - previewSize / 2;
        const previewWidth = previewSize;
        const previewHeight = previewSize;

        setColorDropperWrapperStyles({
            position: 'absolute',
            transform: `translate(${x}px, ${y}px)`,
            left: `${0}px`,
            top: `${0}px`,
            pointerEvents: 'none',
        });

        setPreviewData(
            ctx?.getImageData(
                previewX,
                previewY,
                previewWidth,
                previewHeight,
            ).data as Uint8ClampedArray
        );
    }

    return (
        // @ts-ignore
        <div style={styles.boardWrapper}>
            {/* @ts-ignore */}
            <div style={styles.toolbar}>
                <span>Toolbar</span>
                <span>Toolbar</span>
                <span>Toolbar</span>
            </div>
            {/* @ts-ignore */}
            <div ref={canvasWrapperRef} style={styles.canvasWrapper}>
                <canvas
                    ref={canvasRef}
                    style={styles.mainCanvas}
                    onMouseMove={handleMouseMove}
                ></canvas>
                {/* @ts-ignore */}
                <div ref={previewWrapperRef} style={colorDropperWrapperStyles}>
                    <ColorDropperPreview data={previewData} size={previewSize} />
                </div>
            </div>
        </div>
    );
}

export default Board;

const styles = {
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    boardWrapper: {
        flex: 1,
        height: '100%',
        backgroundColor: '#ededed',
        display: 'flex',
        flexDirection: 'column',
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--card-bg-color)',
        height: '3rem',
        gap: '1rem',
    },
    canvasWrapper: {
        // width: '100%',
        height: '100%',
        position: 'relative',
    },
    mainCanvas: {
        backgroundColor: '#ededed',
        width: '100%',
        height: '100%',
    },
    colorDropperWrapper: {
        position: 'absolute',
        top: '10px',
        left: '10px',
    },
};