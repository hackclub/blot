import { getStore } from "./state.js";
import download from "./download.js";
import type { Turtle } from "haxidraw-client";

export default function downloadSvg() {
    const { turtles, docDimensions } = getStore();

    const turtleToPathData = (t: Turtle) => {
        let d = "";

        t.path.forEach(pl => pl.forEach((pt, i) => {
            const [ x, y ] = pt;
            if (i === 0) d += `M ${x} ${y}`;
            else d += `L ${x} ${y}`
        }))

        return d;
    }

    const turtleToPath = (t: Turtle) => {
        const d = turtleToPathData(t);

        return `<path 
                    d="${d}" 
                    stroke-width="0.25" 
                    stroke="black" 
                    fill="none" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: scale(1, -1);"
                    />`
    }

    const paths = turtles.map(turtleToPath);

    const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${docDimensions.width} ${docDimensions.height}" width="${docDimensions.width}mm" height="${docDimensions.height}mm">
                    ${paths.join("\n")}
                </svg>
            `
    download("anon.svg", svg);
}