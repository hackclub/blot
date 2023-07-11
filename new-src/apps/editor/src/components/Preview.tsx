import { useRef, useEffect, useCallback } from "preact/hooks";
import styles from "./Preview.module.css";
import { getStore, useStore } from "../lib/state.ts";
import cx from "classnames";

const panZoomParams = {
    panX: 400,
    panY: 400,
    scaleX: 200,
    scaleY: 200
};

export default function Preview(props: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { turtles } = useStore(["turtles"]);

    const redraw = useCallback(() => {
        const canvas = canvasRef.current;
        const { turtlePos } = getStore();
        if(!canvas || !turtlePos) return;
        
        // turtle canvas
        const ctx = canvasRef.current.getContext("2d")!;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(
          panZoomParams.panX + turtlePos[0] * panZoomParams.scaleX, 
          panZoomParams.panY + turtlePos[1] * panZoomParams.scaleY, 
          7, 
          0, 
          2 * Math.PI
        );
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.fillStyle = "#ffa500";
        ctx.fill();
    
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        // turtle path
        if(turtles.length === 0) return;
        const { panX, panY, scaleX, scaleY } = panZoomParams;

        ctx.beginPath();
    
        turtles.forEach(turtle => {
          for (const polyline of turtle.path) {
            for (let i = 0; i < polyline.length; i++) {
              let [x, y] = polyline[i];
              x = panX + x * scaleX;
              y = -panY + y * scaleY;
              if (i === 0) ctx.moveTo(x, -y);
              else ctx.lineTo(x, -y);
            }
          }
        })
    
        ctx.stroke();
    }, [canvasRef.current, turtles]);

    const onResize = useCallback(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        // resize canvas, taking the pixel density of the screen into account
        const dpr = window.devicePixelRatio || 1;
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

    useEffect(redraw, [turtles, canvasRef.current]);

    // controls

    useEffect(() => {
        if(!canvasRef.current) return;

        let mouseX = 0;
        let mouseY = 0;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            const ZOOM_SPEED = 0.0005;

            const scaleChange = 1 + (-e.deltaY * ZOOM_SPEED);

            panZoomParams.scaleX *= scaleChange;
            panZoomParams.scaleY *= scaleChange;        

            const canvasMousePos = [
                mouseX * window.devicePixelRatio,
                mouseY * window.devicePixelRatio
            ];

            panZoomParams.panX -= (canvasMousePos[0] - panZoomParams.panX) * (scaleChange - 1);
            panZoomParams.panY -= (canvasMousePos[1] - panZoomParams.panY) * (scaleChange - 1);            

            redraw();
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if(e.buttons !== 1) return;
            e.preventDefault();

            const [dx, dy] = [
                e.movementX * window.devicePixelRatio,
                e.movementY * window.devicePixelRatio
            ];

            panZoomParams.panX += dx;
            panZoomParams.panY += dy;

            redraw();
        };

        canvasRef.current.addEventListener("wheel", onWheel);
        canvasRef.current.addEventListener("mousemove", onMouseMove);

        return () => {
            canvasRef.current!.removeEventListener("wheel", onWheel);
            canvasRef.current!.removeEventListener("mousemove", onMouseMove);
        };
    })

    return (
        <div className={cx(styles.root, props.className)}>
            <canvas ref={canvasRef} />
        </div>
    )
}