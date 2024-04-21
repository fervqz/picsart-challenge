/** Utility functions */

export function drawPixel(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    isMiddlePixel?: boolean,
) {
    ctx.fillStyle = color;
    ctx.strokeStyle = isMiddlePixel ? 'white' : 'gray';
    ctx.lineWidth = isMiddlePixel ? 2 : 1;
    ctx.strokeRect(x, y, 10, 10);
    ctx.fillRect(x, y, 10, 10);
}

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

export function renderPrecissionTest(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 180, 50);

    ctx.font = "16px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Precission Test Section", 5, 35);

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 10, 10);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(10, 0, 10, 10);
    ctx.fillStyle = 'blue';
    ctx.fillRect(20, 0, 10, 10);

    ctx.fillStyle = 'red';
    ctx.fillRect(30, 0, 5, 5);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(35, 0, 5, 5);
    ctx.fillStyle = 'blue';
    ctx.fillRect(40, 0, 5, 5);

    ctx.fillStyle = 'red';
    ctx.fillRect(45, 0, 2, 2);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(47, 0, 2, 2);
    ctx.fillStyle = 'blue';
    ctx.fillRect(49, 0, 2, 2);

    ctx.fillStyle = 'red';
    ctx.fillRect(51, 0, 1, 1);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(52, 0, 1, 1);
    ctx.fillStyle = 'blue';
    ctx.fillRect(53, 0, 1, 1);
}

export function clearCanvas(ctx: CanvasRenderingContext2D) {
    if (!ctx) { return; }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#ededed';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}