import { useRef, useEffect, useCallback } from "preact/hooks";
import styles from "./Preview.module.css";
import { getStore, useStore } from "../lib/state.ts";
import CenterToFitIcon from "../ui/CenterToFitIcon.tsx";
import Button from "../ui/Button.tsx";
import type { Point } from "haxidraw-client";
import lineclip from "../lib/lineclip.ts";
import ScalableCanvas, { type RedrawFn, dpr, ScalableCanvasHandle } from "./ScalableCanvas.tsx";

const redrawFn: RedrawFn = (canvas, ctx, panZoomParams) => {
    const { turtlePos, turtles, docDimensions: { width: docW, height: docH } } = getStore();
    if (!canvas || !turtlePos) return;

    // we want to only work in virtual pixels, and just deal with device pixels in rendering
    const width = canvas.width/* / dpr*/;
    const height = canvas.height/* / dpr*/;

    // turtle canvas
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(
        dpr * (panZoomParams.panX + turtlePos[0] * panZoomParams.scale),
        dpr * (panZoomParams.panY + (-1 * turtlePos[1]) * panZoomParams.scale),
        dpr * 7,
        0,
        2 * Math.PI
    );
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.fillStyle = "#ffa500";
    ctx.fill();

    // draw document

    ctx.strokeStyle = "#3333ee";

    ctx.strokeRect(dpr * panZoomParams.panX, dpr * panZoomParams.panY, dpr * docW * panZoomParams.scale, dpr * docH * panZoomParams.scale);

    // draw turtles

    ctx.strokeStyle = "black";

    // turtle path
    // if(turtles.length === 0) return;
    const { panX, panY, scale } = panZoomParams;

    ctx.beginPath();

    for (const turtle of turtles) {
        for (const polyline of turtle.path) {
            const p = polyline.map(([x, y]) => [dpr * (panX + x * scale), -(dpr * (-panY + y * scale))]);
            const paths = lineclip(p as Point[], [0, 0, width, height]);

            paths.forEach(p => {
                for (let i = 0; i < p.length; i++) {
                    let [x, y] = p[i];
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
            })
        }
    }

    ctx.stroke();
};

export default function Preview(props: { className?: string }) {
    const scalableCanvasRef = useRef<ScalableCanvasHandle>(null);
    const { turtles } = useStore(["turtles"]);

    useEffect(() => { scalableCanvasRef.current && scalableCanvasRef.current.requestRedraw(); }, [turtles, scalableCanvasRef.current]);

    const centerView = useCallback(() => {
        const { docDimensions } = getStore();

        const canvas = scalableCanvasRef.current?.canvas;
        if(!canvas) return;

        const { panZoomParams, requestRedraw } = scalableCanvasRef.current;

        const br = canvas.getBoundingClientRect();
        panZoomParams.scale = Math.min(
            (br.width - 20) / docDimensions.width,
            (br.height - 20) / docDimensions.height
        );

        panZoomParams.panX = br.width / 2 - (docDimensions.width * panZoomParams.scale) / 2;
        panZoomParams.panY = br.height / 2 - (docDimensions.height * panZoomParams.scale) / 2;

        requestRedraw();
    }, []);

    useEffect(centerView, [scalableCanvasRef.current?.canvas]);

    return (
        <ScalableCanvas ref={scalableCanvasRef} className={props.className} redrawFn={redrawFn}>
            <Button class={styles.centerButton} variant="ghost" icon aria-label="center document in view" onClick={centerView}>
                <CenterToFitIcon />
            </Button>
        </ScalableCanvas>
    )
}