'use client';

import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

interface Props {
    data: Uint8ClampedArray;
    size: number;
}

const ColorDropperPreview: React.FC<Props> = ({ data, size }: Props) => {

    const styles = {
        container: {
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            gridTemplateRows: `repeat(${size}, 1fr)`,
            gap: '1px',
            columnGap: '1px',
            maxWidth: 'fit-content',
            clipPath: 'circle(50%)',
            backgroundColor: 'gray',
        },
        pixel: {
            width: '10px',
            height: '10px',
            backgroundColor: 'white',
        },
    }

    const previewRef = useRef<HTMLDivElement>(null);
    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {
        setColors(mapData(data));
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

    return (
        <div ref={previewRef} style={styles.container}>
            {colors.map((color, i) => {

                const middle = Math.round(size * size / 2) - 1;

                return (
                    <div
                        key={i}
                        style={{
                            ...styles.pixel,
                            backgroundColor: color,
                            border: middle === i ? '1.5px solid white' : 'none',
                        }}
                    ></div>
                );

            })}
        </div>
    );

}

export default ColorDropperPreview