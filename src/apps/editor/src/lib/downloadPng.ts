import { getStore } from "./state.ts";
import download from "./download.js";
import type { Point } from "haxidraw-client";

export default async function downloadPng() {
    const { turtles, docDimensions } = getStore();

    // we'll use a fixed width of 1000px for now

    const canvas = new OffscreenCanvas(1000, 1000 * docDimensions.height / docDimensions.width);
    const mapPoint = ([x, y]: Point) => [x * (canvas.width / docDimensions.width), -1 * y * (canvas.height / docDimensions.height)] as Point;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.beginPath();

    for(const turtle of turtles) {
        for(const polyline of turtle.path) {
            for(let i = 0; i < polyline.length; i++) {
                const [x, y] = mapPoint(polyline[i]);
                console.log(x, y);
                if(i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
        }
    }

    ctx.stroke();

    const blob = await canvas.convertToBlob();
    download("haxidraw.png", blob);
}