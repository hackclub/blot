import { getStore } from "./state.ts";

const DPI = 1000;
const SCALE = DPI/25.4;

export function getBitmap() {
  const { turtles, docDimensions } = getStore()

  // make min 0, 0

  const canvas = document.createElement('canvas');
  canvas.width = docDimensions.width*SCALE;
  canvas.height = docDimensions.height*SCALE;

  const ctx = canvas.getContext('2d');
  // ctx.transform(1, 0, 0, -1, 0, canvas.height)

  console.log(turtles);

  const drawTurtle = t => {
    ctx.beginPath();

    t.path.forEach(pl =>
      pl.forEach((pt, i) => {
        const [x, y] = pt.map(n => n*SCALE);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      })
    )

    ctx.strokeStyle = t.style.stroke;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.fillStyle = t.style.fill;
    if (t.style.fill !== "none") ctx.fill();
  }

  turtles.forEach(drawTurtle);



  canvas.style = `
    position: absolute;
    left: 0;
    top: 0;
  `

  // console.log(canvas);

  // setTimeout(() => {
  //   canvas.remove();
  // }, 3000);

  return canvas;
}

export function createMask() {
  const canvas = getBitmap();
  const ctx = canvas.getContext('2d');

  function circle(x, y, color, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  const avgGrey = (x, y) => {
    const colors = ctx.getImageData(x*SCALE-1, y*SCALE-1, 3, 3);
    const { data } = colors;

    let totalGrey = 0;
    let totalOpacity = 0;

    for (let i = 0; i < data.length; i++) {
      if (i % 4 === 0) totalOpacity += data[i];
      else {
        totalGrey += data[i];
      }
    }

    let avgGrey = totalGrey/3/255/9;

    console.log({
      x,
      y,
      grey: avgGrey,
      data
    })

    return avgGrey;
  }

  const isVisible = (x, y) => {
    const scaleX = x*SCALE;
    const scaleY = y*SCALE;
    const pixel0 = ctx.getImageData(scaleX, scaleY, 1, 1).data;
    const isWhite0 = pixel0.every(v => v === 255);
    const pixel1 = ctx.getImageData(scaleX-1, scaleY+1, 1, 1).data;
    const isWhite1 = pixel1.every(v => v === 255);
    const pixel2 = ctx.getImageData(scaleX+1, scaleY-1, 1, 1).data;
    const isWhite2 = pixel2.every(v => v === 255);
    const pixel3 = ctx.getImageData(scaleX-1, scaleY-1, 1, 1).data;
    const isWhite3 = pixel3.every(v => v === 255);
    const pixel4 = ctx.getImageData(scaleX+1, scaleY+1, 1, 1).data;
    const isWhite4 = pixel4.every(v => v === 255);

    // circle(scaleX, scaleY, isWhite ? "red" : "black", 4);

    // const pixelAfter = ctx.getImageData(scaleX, scaleY, 1, 1).data;

    return !isWhite0 || !isWhite1 || !isWhite2 || !isWhite3 || !isWhite4;

  }

  function getPixelGrayValue(x, y) {
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return 0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2]; // Convert to grayscale
  }

  return {
    canvas,
    avgGrey,
    isVisible
  }

}







