import { createListener } from "../createListener.js";

export function addBezierControl() {
    const listen = createListener(document.body);

    let draggedElement = null;
    let svg = null;
    let container = null;


    listen("mousedown", ".bez-handle", (e) => {
        draggedElement = e.target;
        svg = draggedElement.ownerSVGElement;
        container = draggedElement.closest(".bez-ctrl");
    })

    listen("mousemove", ".bez-ctrl, .bez-ctrl *", e => {
        if (draggedElement === null || svg === null) return;

        let pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;

        // Transform the point from screen coordinates to SVG coordinates
        let svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

        let x = svgP.x;
        let y = svgP.y;

        x = Math.max(x, 0);
        x = Math.min(x, 1);
        y = Math.max(y, -1);
        y = Math.min(y, 1);

        if (draggedElement.classList.contains("start")) {
            container.pointRef.yStartView = y;
            container.change();
        }

        if (draggedElement.classList.contains("end")) {
            container.pointRef.yEndView = y;
            container.change();
        }

        if (draggedElement.classList.contains("h0")) {
            container.pointRef.p0xView = x;
            container.pointRef.p0yView = y;
            container.change();
        }

        if (draggedElement.classList.contains("h1")) {
            container.pointRef.p1xView = x;
            container.pointRef.p1yView = y;
            container.change();
        }
    })

    listen("mouseup", "", () => {
        draggedElement = null;
        svg = null;
        container = null;
    })
}
    