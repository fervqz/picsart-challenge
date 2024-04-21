
export function parseUint8ClampedArray(data: Uint8ClampedArray): string[] {
    const pixelsColor = [];
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        const color = rgbToHex(r, g, b, a);
        pixelsColor.push(color);
    }
    return pixelsColor;
};

export function rgbToHex(
    r: number,
    g: number,
    b: number,
    a: number
): string {
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase();
}

