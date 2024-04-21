'use client';
import "./styles.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { clearCanvas, drawImage, drawLoading, getMousePosition } from "@/lib/canvas.utils";
import BoardToolbar from "../BoardToolbar/BoardToolbar";
import ColorPickerPreview from '@/components/ColorPickerPreview/ColorPickerPreview';
import useColorPickerStore, { ColorPickerStore } from "@/store/colorPicker";
import { off } from "process";

interface PreviewData {
    data: Uint8ClampedArray | null;
    size: number;
    position: { x: number, y: number };
}

const Board: React.FC = () => {

    const {
        previewSize,
        activeTool,
        hoveredColor,
        image,
        setActiveTool,
        setCurrentColor,
    } = useColorPickerStore((state: ColorPickerStore) => state);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [currentScale, setCurrentScale] = useState<number>(1);
    const [preview, setPreview] = useState<PreviewData>({
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

    /** Deletes cached image and draws new one */
    useEffect(() => {
        imgRef.current = null;
        draw();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctx, image]);

    const draw = () => {
        if (!ctx) { return; }
        clearCanvas(ctx);

        /** Checking if image is already loaded */
        if (!imgRef.current) {
            drawLoading(ctx);
            imgRef.current = new Image();
            imgRef.current.src = image;
            imgRef.current.setAttribute('crossOrigin', 'anonymous');
            imgRef.current.onload = () => {
                clearCanvas(ctx);
                drawImage(ctx, imgRef);
            };
        } else {
            drawImage(ctx, imgRef);
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(true);
        ctx!.canvas.style.cursor = 'grabbing';
        if (showPreview) {
            setCurrentColor(hoveredColor);
            setActiveTool(null);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        ctx!.canvas.style.cursor = 'default';
    }

    /** Zoom */
    const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
        if (!ctx) { return; }

        const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
        const { x, y } = getMousePosition(ctx, e);
        const offsetX = x * (1 - scaleFactor);
        const offsetY = y * (1 - scaleFactor);
        setCurrentScale(prev => prev * scaleFactor);

        window.requestAnimationFrame(() => {
            clearCanvas(ctx);
            ctx.transform(scaleFactor, 0, 0, scaleFactor, offsetX, offsetY);
            draw();
        });
    }


    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!ctx) { return; }
        if (isDragging) {
            panCanvas(e);
        }
        updatePreviewPosition(e);

    }

    const panCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!ctx) { return; }
        window.requestAnimationFrame(() => {
            clearCanvas(ctx);
            // Adapting to panning offset by current scaling value.
            ctx.translate(1 / currentScale * e.movementX, 1 / currentScale * e.movementY);
            draw();
        });
    }

    const updatePreviewPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!ctx) { return; }
        const { x, y } = getMousePosition(ctx!, e);
        const previewX = x - previewSize / 2;   // Offsetting preview's origin point 
        const previewY = y - previewSize / 2;   // Offsetting preview's origin point 

        const imageData = ctx.getImageData(
            previewX,
            previewY,
            previewSize,
            previewSize,
        ).data;

        setPreview(prev => ({
            ...prev,
            data: imageData,
            position: {
                /** Offsetting preview position to its own center, 10 = preview's pixel size */
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
                    onMouseUp={handleMouseUp}
                    onMouseDown={handleMouseDown}
                    style={{ cursor: activeTool === 'color-picker' && showPreview ? 'none' : 'default' }}
                ></canvas>
                {showPreview && <ColorPickerPreview {...preview} />}
            </div>

        </div >
    );
}

export default Board;
