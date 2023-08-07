import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import styles from "./BezierEditor.module.css";
import cx from "classnames";
import ScalableCanvas, {
    dpr, RedrawFn,
    ScalableCanvasHandle
} from "./ScalableCanvas.tsx";
import type { Point } from "haxidraw-client";

type BezierPoints = {
    p0: Point;
    p1: Point;
    end: Point;
};

const BE_WIDTH = 200;
const BE_HEIGHT = 200;

type MapItem = {
    cursor: string | undefined,
    onDrag: (e: MouseEvent) => void
};
type CursorMapFn = (x: number, y: number) => MapItem | undefined;

export default function BezierEditor(props: {
    className?: string;
    width: number;
    height: number;
}) {
    const bezierPoints = useRef<BezierPoints>({
        p0: [3, 2],
        p1: [5, 4],
        end: [7, 2]
    });
    const scalableCanvasRef = useRef<ScalableCanvasHandle>(null);
    const cursorMap = useRef<CursorMapFn[]>([]);
    
    useEffect(() => {
        if(!scalableCanvasRef.current) return;
        const canvas = scalableCanvasRef.current.canvas;
        if(!canvas) return;
        
        let currentlyDragging: false | MapItem = false;

        const listener = (e: MouseEvent) => {
            if (!scalableCanvasRef.current || !scalableCanvasRef.current.canvas)
                return;
            if (currentlyDragging) {
                if (e.buttons === 1) {
                    currentlyDragging.onDrag(e);
                    scalableCanvasRef.current.canvas!.style.cursor = currentlyDragging.cursor ?? "";
                    return;
                }
                currentlyDragging = false;
            }
            const mapItem = cursorMap.current.reduce<ReturnType<CursorMapFn>>((prev, fn) => prev ?? fn(e.offsetX, e.offsetY), undefined);
            scalableCanvasRef.current.canvas!.style.cursor = mapItem?.cursor ?? "";
            
            if (e.buttons === 1 && mapItem) {
                currentlyDragging = mapItem;
                currentlyDragging.onDrag(e);
            }
        };

        canvas.addEventListener("mousemove", listener);
        return () => {
            canvas.removeEventListener("mousemove", listener);
        };
    }, [scalableCanvasRef.current?.canvas]);

    const redrawFn: RedrawFn = useCallback((canvas, ctx, panZoomParams) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.scale(dpr, dpr);

        cursorMap.current = [];
        ctx.beginPath();
        ctx.moveTo(
            panZoomParams.panX,
            panZoomParams.panY //+ 0.5 * panZoomParams.scale
        );
        // map from mm to absolute coords (using the panZoomParams)
        const mapPoint = (p: Point): Point => [
            (panZoomParams.panX + p[0] * panZoomParams.scale),
            (panZoomParams.panY + p[1] * panZoomParams.scale)
        ];
        ctx.bezierCurveTo(
            ...mapPoint(bezierPoints.current.p0),
            ...mapPoint(bezierPoints.current.p1),
            ...mapPoint(bezierPoints.current.end)
        );
        ctx.stroke();

        const drawHandle = (x: number, y: number, radius: number, pointKey: keyof BezierPoints) => {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            cursorMap.current.push((mx, my) => {
                const dx = mx - x;
                const dy = my - y;
                if(dx * dx + dy * dy < radius * radius) return {
                    cursor: "grab",
                    onDrag: (e: MouseEvent) => {
                        // use offsetX and offsetY
                        const newPoint: Point = [
                            (e.offsetX - panZoomParams.panX) / panZoomParams.scale,
                            (e.offsetY - panZoomParams.panY) / panZoomParams.scale
                        ];
                        bezierPoints.current[pointKey] = newPoint;
                        scalableCanvasRef.current?.requestRedraw();
                        // const dx = e.movementX / panZoomParams.scale;
                        // const dy = e.movementY / panZoomParams.scale;
                        // bezierPoints.current[pointKey][0] += dx;
                        // bezierPoints.current[pointKey][1] += dy;
                    }
                };
                return undefined;
            });
        };

        ctx.fillStyle = "#ff0000aa";
        // draw dashed line from [0, 0] to p0
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(...mapPoint([0, 0]));
        ctx.lineTo(...mapPoint(bezierPoints.current.p0));
        ctx.stroke();
        // from end to p1
        ctx.beginPath();
        ctx.moveTo(...mapPoint(bezierPoints.current.end));
        ctx.lineTo(...mapPoint(bezierPoints.current.p1));
        ctx.stroke();
        ctx.setLineDash([]);

        // drawCircle(...mapPoint([0, 0]), 5);
        drawHandle(...mapPoint(bezierPoints.current.p0), 8, "p0");
        drawHandle(...mapPoint(bezierPoints.current.p1), 8, "p1");
        ctx.fillStyle = "#00ff00aa";
        drawHandle(...mapPoint(bezierPoints.current.end), 8, "end");


        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }, []);

    return (
        <div className={cx(styles.root, props.className)}>
            <h3>edit bezier</h3>
            <div className={styles.canvasRoot}>
                <ScalableCanvas
                    ref={scalableCanvasRef}
                    disablePan={true}
                    zoomFixedPointOverride={[0, BE_HEIGHT / 2]}
                    initialPanZoom={{
                        panX: 0,
                        panY: BE_HEIGHT / 2,
                        scale: BE_WIDTH / 10 // 10mm default width of viewport
                    }}
                    redrawFn={redrawFn}
                ></ScalableCanvas>
            </div>
        </div>
    );
}
