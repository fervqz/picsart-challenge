'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    data: Uint8ClampedArray | null;
    size: number;
}

const ColorDropperPreview2: React.FC<Props> = ({ data, size }: Props) => {

    const previewRef = useRef<HTMLCanvasElement>(null);
    const [colors, setColors] = useState<string[]>([]);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const newCtx = previewRef.current?.getContext("2d", { willReadFrequently: true }) ?? null;
        setCtx(newCtx);
    }, [])

    useEffect(() => {
        if (!data) { return; }
        setColors(mapData(data));
        draw();
    }, [data]);

    const mapData = (data: Uint8ClampedArray): string[] => {

        const pixelsColor = [];

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            const color = `rgba(${r}, ${g}, ${b}, ${a})`;
            pixelsColor.push(color);
        }

        return pixelsColor;
    };


    const draw = () => {
        if (!ctx) { return; }

        ctx.clearRect(0, 0, 100, 100);
        ctx.fillStyle = 'black';
        const middlePixelIndex = Math.round(size * size / 2) - 1;

        let middlePixelX = 0;
        let middlePixelY = 0;
        let middlePixelColor = '';

        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {

                const index = i + j * size;

                ctx.fillStyle = colors[index];
                ctx.strokeStyle = 'black';

                ctx.strokeStyle = 'gray';
                if (middlePixelIndex === index) {
                    middlePixelX = i * 10;
                    middlePixelY = j * 10;
                    middlePixelColor = colors[index];
                }
                ctx.strokeRect(i * 10, j * 10, 10, 10);
                ctx.fillRect(i * 10, j * 10, 10, 10);
            }
        }

        ctx.fillStyle = middlePixelColor;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeRect(middlePixelX, middlePixelY, 10, 10);
        ctx.fillRect(middlePixelX, middlePixelY, 10, 10);

    }

    return (
        <canvas ref={previewRef} width={size * 10} height={size * 10} style={styles.preview}></canvas>
    );

}

export default ColorDropperPreview2;

const styles = {
    preview: {
        border: '1px solid black',
        clipPath: 'circle(49%)',
    },
}