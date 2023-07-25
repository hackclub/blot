import { useRef, useEffect, useCallback } from "preact/hooks";
import styles from "./Preview.module.css";
import { getStore, useStore } from "../lib/state.ts";
import cx from "classnames";
import CenterToFitIcon from "../ui/CenterToFitIcon.tsx";
import Button from "../ui/Button.tsx";
import type { Point } from "haxidraw-client";
import lineclip from "../lib/lineclip.ts";

const panZoomParams = {
    panX: 200,
    panY: 200,
    scale: 100
};

let dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;

let redrawRequested = false;
let runRedrawAfter = false;

const requestRedraw = (canvas: HTMLCanvasElement) => {
    if(redrawRequested) {
        runRedrawAfter = true;
        return;
    }
    redrawRequested = true;
    runRedrawAfter = false;
    requestAnimationFrame(() => {
        _redraw(canvas);
        redrawRequested = false;
        if(runRedrawAfter) requestRedraw(canvas);
    })
};

let _ctx: CanvasRenderingContext2D | null = null;

const setCtxProperties = () => {
    if(!_ctx) return;

    _ctx!.lineWidth = 1;
    _ctx!.lineJoin = "round";
    _ctx!.lineCap = "round";
}
const getCtx = (canvas: HTMLCanvasElement) => {
    if(!_ctx) {
        _ctx = canvas.getContext("2d");
        setCtxProperties();
    }
    return _ctx!;
}

const _redraw = (canvas: HTMLCanvasElement) => {
    const { turtlePos, turtles, docDimensions: { width: docW, height: docH } } = getStore();
    if (!canvas || !turtlePos) return;

    // we want to only work in virtual pixels, and just deal with device pixels in rendering
    const width = canvas.width/* / dpr*/;
    const height = canvas.height/* / dpr*/;

    // turtle canvas
    const ctx = getCtx(canvas);

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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePosRef = useRef<HTMLDivElement>(null);
    const { turtles } = useStore(["turtles"]);

    useEffect(() => { canvasRef.current && requestRedraw(canvasRef.current); }, [turtles, canvasRef.current]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const resizeObserver = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            setCtxProperties(); // setting width/height clears ctx state

            requestRedraw(canvas);
        });

        resizeObserver.observe(canvas);
        return () => resizeObserver.disconnect();
    }, [canvasRef.current]);

    // controls

    useEffect(() => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        _ctx = null;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            const ZOOM_SPEED = 0.0005;

            const { panX, panY, scale } = panZoomParams;
            
            // const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale + e.deltaY * -ZOOM_SPEED));
            const newScale = scale + scale*(-e.deltaY * ZOOM_SPEED);


            const br = canvas.getBoundingClientRect();
            const fixedPoint = { x: e.clientX - br.left, y: e.clientY - br.top };
            panZoomParams.panX = fixedPoint.x + (newScale / scale) * (panX - fixedPoint.x);
            panZoomParams.panY = fixedPoint.y + (newScale / scale) * (panY - fixedPoint.y);
            panZoomParams.scale = newScale;

            requestRedraw(canvas);
        };

        const onMouseMove = (e: MouseEvent) => {
            // update mousepos
            const mousePos = mousePosRef.current;
            if(mousePos) {
                // convert mouse pos to virtual coords (accounting for zoom, scale)
                const { panX, panY, scale } = panZoomParams;
                const br = canvas.getBoundingClientRect();
                let x = (e.clientX - br.left);
                x = (x - panX) / scale;
                let y = (e.clientY - br.top);
                y = (y - panY) / scale;
                const addPadding = (s: string) => s.startsWith("-") ? s : " " + s;
                mousePos.textContent = `${addPadding(x.toFixed(1))}mm, ${addPadding(y.toFixed(1))}mm`;
            }

            if(e.buttons !== 1) return;
            e.preventDefault();

            panZoomParams.panX += (e.movementX);
            panZoomParams.panY += (e.movementY);

            requestRedraw(canvas);
        };

        canvas.addEventListener("wheel", onWheel);
        canvas.addEventListener("mousemove", onMouseMove);

        return () => {
            canvas.removeEventListener("wheel", onWheel);
            canvas.removeEventListener("mousemove", onMouseMove);
        };
    }, [canvasRef.current, mousePosRef.current]);

    const centerView = useCallback(() => {
        const { docDimensions } = getStore();

        const canvas = canvasRef.current;
        if(!canvas) return;

        const br = canvas.getBoundingClientRect();
        panZoomParams.scale = Math.min(
            (br.width - 20) / docDimensions.width,
            (br.height - 20) / docDimensions.height
        );

        panZoomParams.panX = br.width / 2 - (docDimensions.width * panZoomParams.scale) / 2;
        panZoomParams.panY = br.height / 2 - (docDimensions.height * panZoomParams.scale) / 2;

        requestRedraw(canvas);
    }, [canvasRef.current]);

    useEffect(centerView, [canvasRef.current]);

    return (
        <div class={styles.root}>
            <canvas ref={canvasRef} className={cx(styles.canvas, props.className)} />
            <div class={styles.mousePosition} ref={mousePosRef} />
            <Button class={styles.centerButton} variant="ghost" icon aria-label="center document in view" onClick={centerView}>
                <CenterToFitIcon />
            </Button>
        </div>
    )
}