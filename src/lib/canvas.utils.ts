import { clear } from "console";
import { RefObject } from "react";

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

export function drawLoading(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ededed';
    const text = "Loading...";
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    ctx.font = '16px Arial';
    ctx.textAlign = "center";
    ctx.fillRect(centerX - 90, centerY - 25, 180, 50);

    ctx.fillStyle = 'black';
    ctx.fillText(text, centerX, centerY);
}

export function drawImage(ctx: CanvasRenderingContext2D, imgRef: RefObject<HTMLImageElement>) {
    const img = imgRef.current!;
    const imgWidth = img.width * .5;
    const imgHeight = img.height * .5;
    ctx?.drawImage(
        img,
        ctx.canvas.width / 2 - imgWidth / 2,
        ctx.canvas.height / 2 - imgHeight / 2,
        imgWidth,
        imgHeight
    );
};

export function getMousePosition(ctx: CanvasRenderingContext2D, e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = ctx!.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;        // Mouse x position relative to canvas
    const y = e.clientY - rect.top;         // Mouse y position relative to canvas
    return { x, y };
}

// export function panCanvas(ctx: CanvasRenderingContext2D, x: number, y: number) {

//     const w = ctx.canvas.width;
//     const h = ctx.canvas.height;

//     const xOffset = x - w / 2;
//     const yOffset = y - h / 2;

//     ctx.translate(xOffset, yOffset);
// }

export function drawPrecisionTest(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 180, 50);

    ctx.font = "16px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("Precision Test Section", 5, 35);

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
    ctx.clearRect(-10000, -10000, 50000, 50000);
}