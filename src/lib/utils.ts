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

export function rgbToHex(r: number, g: number, b: number, a?: number): string {
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    return '#' + hex;
}

export function getColorName(hexColor: string) {

    if (!hexColor) { return ''; }

    const colors = {
        "#000000": "black",
        "#FFFFFF": "white",
        "#FF0000": "red",
        "#00FF00": "green",
        "#0000FF": "blue",
        "#FFFF00": "yellow",
        "#FFA500": "orange",
        "#800080": "purple",
        "#008000": "light green",
        "#00FFFF": "cyan",
        "#FF00FF": "magenta"
    };


    const getColorDistance = (color1: string, color2: string) => {
        const getColorComponent = (color: string) => parseInt(color, 16);

        const r1 = getColorComponent(color1.substring(1, 3));
        const g1 = getColorComponent(color1.substring(3, 5));
        const b1 = getColorComponent(color1.substring(5, 7));
        const r2 = getColorComponent(color2.substring(1, 3));
        const g2 = getColorComponent(color2.substring(3, 5));
        const b2 = getColorComponent(color2.substring(5, 7));

        return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
    }

    const normalizedHexColor = hexColor.toLowerCase();
    let minDistance = Infinity;
    let closestColor = "color desconocido";

    for (const color in colors) {
        const distance = getColorDistance(normalizedHexColor, color);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = colors[color as keyof typeof colors];
        }
    }

    return closestColor;
}

export function renderPrecissionTest(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 180, 50);

    ctx.font = "16px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Precission Text Section", 5, 35);

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 10, 10);
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 0, 10, 10);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(20, 0, 10, 10);

    ctx.fillStyle = 'red';
    ctx.fillRect(30, 0, 5, 5);
    ctx.fillStyle = 'blue';
    ctx.fillRect(35, 0, 5, 5);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(40, 0, 5, 5);

    ctx.fillStyle = 'red';
    ctx.fillRect(45, 0, 2, 2);
    ctx.fillStyle = 'blue';
    ctx.fillRect(47, 0, 2, 2);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(49, 0, 2, 2);

    ctx.fillStyle = 'red';
    ctx.fillRect(51, 0, 1, 1);
    ctx.fillStyle = 'blue';
    ctx.fillRect(52, 0, 1, 1);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(53, 0, 1, 1);
}

export function clearCanvas(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) { return; }
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clearRect(0, 0, 10000, 10000);
    ctx.fillStyle = '#ededed';
    ctx.fillRect(0, 0, 10000, 10000);
}