import styles from "./ScalableCanvas.module.css";
import { useCallback, useImperativeHandle, useRef } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { useEffect } from "preact/hooks";
import type { ComponentChildren } from "preact";
import cx from "classnames";
import type { Point } from "haxidraw-client";

export let dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;

type PanZoomParams = {
    panX: number,
    panY: number,
    scale: number
};

export type ScalableCanvasHandle = {
    requestRedraw: () => void,
    panZoomParams: PanZoomParams,
    canvas?: HTMLCanvasElement
};

export type RedrawFn = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, panZoomParams: PanZoomParams) => void;

function ScalableCanvas({ redrawFn, children, className, disablePan, zoomFixedPointOverride, initialPanZoom, hideUnits, onMouseMove: userOnMouseMove }: {
    redrawFn: RedrawFn,
    children?: ComponentChildren,
    className?: string,
    disablePan?: boolean,
    zoomFixedPointOverride?: Point,
    initialPanZoom?: PanZoomParams,
    hideUnits?: boolean,
    onMouseMove?: (e: MouseEvent) => (boolean | undefined)
}, ref: any) {
    const panZoomParams = useRef<PanZoomParams>(initialPanZoom ?? {
        panX: 200,
        panY: 200,
        scale: 100
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const state = useRef({
        redrawRequested: false,
        runRedrawAfter: false
    });

    const _ctx = useRef<CanvasRenderingContext2D | null>(null);

    const setCtxProperties = useCallback(() => {
        if(!_ctx.current) return;

        _ctx.current.lineWidth = 1;
        _ctx.current.lineJoin = "round";
        _ctx.current.lineCap = "round";
    }, []);

    const getCtx = useCallback((canvas: HTMLCanvasElement) => {
        if(!_ctx.current) {
            _ctx.current = canvas.getContext("2d");
            setCtxProperties();
        }
        return _ctx.current!;
    }, []);

    const requestRedraw = useCallback((canvas: HTMLCanvasElement) => {
        if(state.current.redrawRequested) {
            state.current.runRedrawAfter = true;
            return;
        }
        state.current.redrawRequested = true;
        state.current.runRedrawAfter = false;
        requestAnimationFrame(() => {
            redrawFn(canvas, getCtx(canvas), panZoomParams.current);
            state.current.redrawRequested = false;
            if(state.current.runRedrawAfter) requestRedraw(canvas);
        })
    }, []);

    useImperativeHandle(ref, () => ({
        requestRedraw: () => {
            if(!canvasRef.current) return;
            requestRedraw(canvasRef.current);
        },
        panZoomParams: panZoomParams.current,
        get canvas() { return canvasRef.current; }
    }), [canvasRef.current]);

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

    const mousePosRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        _ctx.current = null;
        
        const updateMousePos = (e: { clientX: number, clientY: number }) => {
            // update mousepos
            const mousePos = mousePosRef.current;
            if (!mousePos) {
                return;
            }
            const { panX, panY, scale } = panZoomParams.current;
            const br = canvas.getBoundingClientRect();
            let x = e.clientX - br.left;
            x = (x - panX) / scale;
            let y = e.clientY - br.top;
            y = (y - panY) / scale;
            const addPadding = (s: string) => (s.startsWith("-") ? s : " " + s);
            mousePos.textContent = `${addPadding(x.toFixed(1))}${hideUnits ? "" : "mm"}, ${addPadding(y.toFixed(1))}${hideUnits ? "" : "mm"}`;
        }

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            const ZOOM_SPEED = 0.0005;

            const { panX, panY, scale } = panZoomParams.current;

            // const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale + e.deltaY * -ZOOM_SPEED));
            const newScale = scale + scale*(-e.deltaY * ZOOM_SPEED);


            const br = canvas.getBoundingClientRect();
            const fixedPoint = zoomFixedPointOverride ? {
                x: zoomFixedPointOverride[0],
                y: zoomFixedPointOverride[1]
            } : { x: e.clientX - br.left, y: e.clientY - br.top };

            panZoomParams.current.panX = fixedPoint.x + (newScale / scale) * (panX - fixedPoint.x);
            panZoomParams.current.panY = fixedPoint.y + (newScale / scale) * (panY - fixedPoint.y);
            panZoomParams.current.scale = newScale;

            if(zoomFixedPointOverride) updateMousePos(e);

            requestRedraw(canvas);
        };

        const onMouseMove = (e: MouseEvent) => {
            updateMousePos(e);

            if(userOnMouseMove?.(e) || e.buttons !== 1 || disablePan) return;
            e.preventDefault();

            panZoomParams.current.panX += e.movementX;
            panZoomParams.current.panY += e.movementY;

            requestRedraw(canvas);
        };

        canvas.addEventListener("wheel", onWheel);
        canvas.addEventListener("mousemove", onMouseMove);

        return () => {
            canvas.removeEventListener("wheel", onWheel);
            canvas.removeEventListener("mousemove", onMouseMove);
        };
    }, [canvasRef.current, mousePosRef.current, userOnMouseMove]);


    return (
        <div class={styles.root}>
            <canvas ref={canvasRef} className={cx(styles.canvas, className)} />
            <div class={styles.mousePosition} ref={mousePosRef} />
            {children}
        </div>
    );
}

export default forwardRef(ScalableCanvas);