'use client';
import "./styles.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { clearCanvas, renderPrecissionTest } from "@/lib/utils";
import BoardToolbar from "../BoardToolbar/BoardToolbar";
import ColorPickerPreview from '@/components/ColorPickerPreview/ColorPickerPreview';
import useColorPickerStore, { ColorPickerStore } from "@/store/colorPicker";

const Board: React.FC = () => {

    const {
        previewSize,
        activeTool,
        hoveredColor,
        image,
        setActiveTool,
        setCurrentColor,
    } = useColorPickerStore((state: ColorPickerStore) => state);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const [preview, setPreview] = useState<{
        data: Uint8ClampedArray | null;
        size: number;
        position: { x: number, y: number };
    }>({
        data: null,
        size: previewSize,
        position: { x: 0, y: 0 },
    });

    const showPreview = useMemo(
        () => activeTool === 'color-picker' && isHovering,
        [activeTool, isHovering]
    );

    useEffect(() => {
        /** Setting up canvas  */
        canvasRef.current?.setAttribute('width', `${(canvasRef.current?.parentNode as HTMLElement).clientWidth}px`);
        canvasRef.current?.setAttribute('height', `${(canvasRef.current?.parentNode as HTMLElement).clientHeight}px`);
        const newCtx = canvasRef.current?.getContext("2d", { willReadFrequently: true }) ?? null;
        setCtx(newCtx);
    }, []);

    /** Draws image every time the context or image changes */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => draw(), [ctx, image]);

    /**
     * Renders the image to the canvas,
     * also adds the renderPrecissionTest section
     */
    const draw = () => {
        if (!ctx) { return; }
        clearCanvas(ctx);

        const img = new Image();
        img.src = image;
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = () => {
            const imgWidth = img.width * .5;
            const imgHeight = img.height * .5;
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
            renderPrecissionTest(ctx);
        };
    }

    /**
     * Sets the selected color to the last hovered color,
     * also deactivates the color picker tool.
     */
    const handleMouseDown = () => {
        if (showPreview) {
            setCurrentColor(hoveredColor);
            setActiveTool(null);
        }
    };

    /**
     *  Scales image when mouse wheel is scrolled.
     */
    const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
        if (!ctx) { return; }
        clearCanvas(ctx);
        const scaleFactor = e.deltaY > 0 ? 0.99 : 1.01;
        ctx?.scale(scaleFactor, scaleFactor);
        draw();
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!ctx) { return; }

        const rect = ctx.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const previewX = x - previewSize / 2;
        const previewY = y - previewSize / 2;
        const previewWidth = previewSize;
        const previewHeight = previewSize;

        setPreview(prev => ({
            ...prev,
            data: ctx?.getImageData(
                previewX,
                previewY,
                previewWidth,
                previewHeight,
            ).data as Uint8ClampedArray,
            position: {
                /** Offsetting preview position to its own center */
                x: x - previewSize * 10 / 2,
                y: y - previewSize * 10 / 2,
            }
        }));
    }

    return (
        <div className="board-wrapper">

            <BoardToolbar />

            <div className="canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    className="main-canvas"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    style={{ cursor: activeTool === 'color-picker' && showPreview ? 'none' : 'default' }}
                ></canvas>

                {showPreview && <ColorPickerPreview {...preview} />}
            </div>

        </div >
    );
}

export default Board;
