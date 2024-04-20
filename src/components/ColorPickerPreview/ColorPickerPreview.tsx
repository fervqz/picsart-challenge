'use client';
import './styles.css';
import { drawPixel, parseUint8ClampedArray } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import PreviewRingSVG from '../svgs/PreviewRingSVG/PreviewRingSVG';
import useColorPickerStore from '@/store/colorPicker';

interface Props {
    data: Uint8ClampedArray | null;
    size: number;
}

const ColorPickerPreview: React.FC<Props> = ({ data, size }: Props) => {

    const { hoveredColor, setHoveredColor } = useColorPickerStore((state: any) => state);
    const previewRef = useRef<HTMLCanvasElement>(null);
    const [colors, setColors] = useState<string[]>([]);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        setCtx(
            previewRef.current?.getContext("2d", { willReadFrequently: true }) ?? null
        );
    }, [])

    useEffect(() => {
        if (!data) { return; }
        setColors(parseUint8ClampedArray(data));
        draw();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);


    const draw = () => {
        if (!ctx) { return; }

        /** Cleaning canvas */
        ctx.clearRect(0, 0, 100, 100);

        /** Calculating middle pixel of preview */
        const middlePixelIndex = Math.round(size * size / 2) - 1;
        let middlePixelX = 0;
        let middlePixelY = 0;

        /** Drawing new pixels */
        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
                const index = i + j * size;
                if (middlePixelIndex === index) {
                    middlePixelX = i * 10;
                    middlePixelY = j * 10;
                    setHoveredColor(colors[index]);
                }
                drawPixel(ctx, i * 10, j * 10, colors[index]);
            }
        }

        /** Drawing middle pixel on top */
        drawPixel(
            ctx,
            middlePixelX,
            middlePixelY,
            'transparent',
            true
        );
    }

    return (
        <div className='preview-wrapper'>
            <canvas
                ref={previewRef}
                width={size * 10}
                height={size * 10}
                className='preview'
            ></canvas>
            <div className='ring-wrapper'>
                <PreviewRingSVG color={hoveredColor} />
                <span className='hover-color-badge'>{hoveredColor}</span>
            </div>
        </div>
    );

}

export default ColorPickerPreview;