import { useRef, useEffect, useCallback } from "preact/hooks";
import styles from "./Preview.module.css";
import { getStore, useStore } from "../lib/state.ts";
import cx from "classnames";

const panZoomParams = {
    panX: 200,
    panY: 200,
    scale: 100
};

let dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;

export default function Preview(props: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { turtles, console } = useStore(["turtles", "console"]);

    const redraw = useCallback(() => {
        const canvas = canvasRef.current;
        const { turtlePos, turtles } = getStore();
        if(!canvas || !turtlePos) return;

        // we want to only work in virtual pixels, and just deal with device pixels in rendering
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;
        
        // turtle canvas
        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr); // handles most high dpi stuff for us (see https://web.dev/canvas-hidipi/)

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.arc(
          panZoomParams.panX + turtlePos[0] * panZoomParams.scale, 
          panZoomParams.panY + (-1 * turtlePos[1]) * panZoomParams.scale, 
          7, 
          0, 
          2 * Math.PI
        );
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.fillStyle = "#ffa500";
        ctx.fill();
    
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1.5;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        // turtle path
        // if(turtles.length === 0) return;
        const { panX, panY, scale } = panZoomParams;

        ctx.beginPath();
    
        turtles.forEach(turtle => {
          for (const polyline of turtle.path) {
            for (let i = 0; i < polyline.length; i++) {
              let [x, y] = polyline[i];
              x = panX + x * scale;
              y = -panY + y * scale;
              if (i === 0) ctx.moveTo(x, -y);
              else ctx.lineTo(x, -y);
            }
          }
        })
    
        ctx.stroke();

        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset the transform matrix so we can set scale with a new dpr later
    }, [canvasRef.current]);

    const onResize = useCallback(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        // resize canvas, taking the pixel density of the screen into account
        dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        redraw();
    }, [canvasRef.current]);

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [onResize]);

    useEffect(() => {
        if(!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;
    }, [canvasRef.current]);

    useEffect(() => {
        onResize();
    }, [turtles, canvasRef.current, console, onResize]);

    // controls

    useEffect(() => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            const ZOOM_SPEED = 0.02;
            const MIN_ZOOM = 10;
            const MAX_ZOOM = 1000;

            const { panX, panY, scale } = panZoomParams;
            
            const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale + e.deltaY * -ZOOM_SPEED));
            
            const br = canvas.getBoundingClientRect();
            const fixedPoint = { x: e.clientX - br.left, y: e.clientY - br.top };
            panZoomParams.panX = fixedPoint.x + (newScale / scale) * (panX - fixedPoint.x);
            panZoomParams.panY = fixedPoint.y + (newScale / scale) * (panY - fixedPoint.y);
            panZoomParams.scale = newScale;

            redraw();
        };

        const onMouseMove = (e: MouseEvent) => {
            if(e.buttons !== 1) return;
            e.preventDefault();

            panZoomParams.panX += e.movementX;
            panZoomParams.panY += e.movementY;

            redraw();
        };

        canvas.addEventListener("wheel", onWheel);
        canvas.addEventListener("mousemove", onMouseMove);

        return () => {
            canvas.removeEventListener("wheel", onWheel);
            canvas.removeEventListener("mousemove", onMouseMove);
        };
    }, [canvasRef.current, redraw]);

    return (
        <canvas ref={canvasRef} className={cx(styles.root, props.className)} />
    )
}