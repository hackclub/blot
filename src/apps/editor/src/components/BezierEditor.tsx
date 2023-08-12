import { useCallback, useRef } from "preact/hooks";
import styles from "./BezierEditor.module.css";
import cx from "classnames";
import ScalableCanvas, {
    dpr, RedrawFn,
    ScalableCanvasHandle
} from "./ScalableCanvas.tsx";
import type { Point } from "haxidraw-client";
import type { ComponentChildren } from "preact";

export type BezierPoints = {
    yStart: number;
    p0: Point;
    p1: Point;
    yEnd: number;
};

const BE_WIDTH = 200;
const BE_HEIGHT = 200;

type MapItem = {
    cursor: string | undefined,
    onDrag: (e: MouseEvent) => void
};
type CursorMapFn = (x: number, y: number) => MapItem | undefined;

export default function BezierEditor(props: {
    className?: string,
    initialValue?: BezierPoints,
    onChange?: (value: BezierPoints) => void,
    children?: ComponentChildren
}) {
    const bezierPoints = useRef<BezierPoints>(props.initialValue ?? {
        yStart: 0,
        p0: [0.3, 0.2],
        p1: [0.5, 0.4],
        yEnd: 0.2
    });
    const scalableCanvasRef = useRef<ScalableCanvasHandle>(null);
    const cursorMap = useRef<CursorMapFn[]>([]);
    const currentlyDraggingRef = useRef<false | MapItem>(false);
    
    const canvasOnMouseMove = useCallback((e: MouseEvent) => {
        if (!scalableCanvasRef.current || !scalableCanvasRef.current.canvas)
            return;
        if (currentlyDraggingRef.current) {
            if (e.buttons === 1) {
                currentlyDraggingRef.current.onDrag(e);
                scalableCanvasRef.current.canvas!.style.cursor = currentlyDraggingRef.current.cursor ?? "";
                return true;
            }
            currentlyDraggingRef.current = false;
        }
        const mapItem = cursorMap.current.reduce<ReturnType<CursorMapFn>>((prev, fn) => prev ?? fn(e.offsetX, e.offsetY), undefined);
        scalableCanvasRef.current.canvas!.style.cursor = mapItem?.cursor ?? "";

        if (e.buttons === 1 && mapItem) {
            currentlyDraggingRef.current = mapItem;
            currentlyDraggingRef.current.onDrag(e);
            return true;
        }
    }, [scalableCanvasRef.current]);

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
        const mpStart = mapPoint([0, bezierPoints.current.yStart]);
        const mp0 = mapPoint(bezierPoints.current.p0);
        const mp1 = mapPoint(bezierPoints.current.p1);
        const mpEnd = mapPoint([1, bezierPoints.current.yEnd]);
        ctx.moveTo(...mpStart);
        ctx.bezierCurveTo(
            ...mp0,
            ...mp1,
            ...mpEnd
        );
        ctx.stroke();

        // draw coordinate grid (centered on (0, 0), mapped ofc)
        const oldStroke = ctx.strokeStyle;
        ctx.strokeStyle = "#ccc";
        const mOrigin = mapPoint([0, 0]);
        ctx.beginPath();
        ctx.moveTo(mOrigin[0], 0);
        ctx.lineTo(mOrigin[0], canvas.height);
        ctx.moveTo(0, mOrigin[1]);
        ctx.lineTo(canvas.width, mOrigin[1]);
        const mEndAxis = mapPoint([1, 0]);
        ctx.moveTo(mEndAxis[0], 0);
        ctx.lineTo(mEndAxis[0], canvas.height);
        ctx.stroke();
        ctx.strokeStyle = oldStroke;

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
                        if(typeof bezierPoints.current[pointKey] === "number") {
                            //@ts-expect-error
                            bezierPoints.current[pointKey] = newPoint[1];
                        } else {
                            //@ts-expect-error
                            bezierPoints.current[pointKey] = newPoint;
                        }
                        props.onChange?.(bezierPoints.current);
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
        ctx.moveTo(...mpStart);
        ctx.lineTo(...mp0);
        ctx.stroke();
        // from end to p1
        ctx.beginPath();
        ctx.moveTo(...mpEnd);
        ctx.lineTo(...mp1);
        ctx.stroke();
        ctx.setLineDash([]);

        // drawCircle(...mapPoint([0, 0]), 5);
        drawHandle(...mp0, 8, "p0");
        drawHandle(...mp1, 8, "p1");
        ctx.fillStyle = "#00ff00aa";
        drawHandle(...mpStart, 8, "yStart");
        drawHandle(...mpEnd, 8, "yEnd");


        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }, []);

    return (
        <div className={cx(styles.root, props.className)}>
            {props.children}
            <div className={styles.canvasRoot}>
                <ScalableCanvas
                    ref={scalableCanvasRef}
                    // disablePan={true}
                    // zoomFixedPointOverride={[0, BE_HEIGHT / 2]}
                    initialPanZoom={{
                        panX: 10,
                        panY: BE_HEIGHT / 2,
                        scale: BE_WIDTH / 1.2 // 1mm default width of viewport
                    }}
                    redrawFn={redrawFn}
                    hideUnits={true}
                    onMouseMove={canvasOnMouseMove}
                ></ScalableCanvas>
            </div>
        </div>
    );
}
