'use client';
import './styles.css';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { parseUint8ClampedArray } from '@/lib/color.utils';
import { drawPixel } from '@/lib/canvas.utils';
import PreviewRingSVG from '../svgs/PreviewRingSVG/PreviewRingSVG';
import useColorPickerStore, { ColorPickerStore } from '@/store/colorPicker';

interface Props {
    data: Uint8ClampedArray | null;
    size: number;
    position: { x: number; y: number; }
}

const ColorPickerPreview: React.FC<Props> = ({ data, size, position }: Readonly<Props>) => {

    const { hoveredColor, setHoveredColor } = useColorPickerStore((state: ColorPickerStore) => state);

    const previewRef = useRef<HTMLCanvasElement>(null);
    const [colors, setColors] = useState<string[]>([]);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

    const [colorDropperWrapperStyles, setColorDropperWrapperStyles] = useState<CSSProperties>({});

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

    useEffect(() => {
        setColorDropperWrapperStyles((prev) => ({
            ...prev,
            transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        }));
    }, [position]);


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
        <div className='preview-wrapper' style={colorDropperWrapperStyles}>
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