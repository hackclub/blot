import { getStore } from "./state.ts";

const DPI = 1000;
const SCALE = DPI/25.4;

export function getBitmap() {
  const { turtles, docDimensions } = getStore()
  const w = docDimensions.width*SCALE;
  const h = docDimensions.height*SCALE;

  // make min 0, 0

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;

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

  // document.body.appendChild(canvas);

  // console.log(canvas);

  // setTimeout(() => {
  //   canvas.remove();
  // }, 3000);

<<<<<<< HEAD
  return canvas
}

export function createMask() {
  const canvas = getBitmap()
  const ctx = canvas.getContext('2d')

  function circle(x, y, color, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
  }

  const avgGrey = (x, y) => {
    const colors = ctx.getImageData(x * SCALE, y * SCALE, 1, 1)
    const { data } = colors

    let totalGrey = 0
    let totalOpacity = 0

    for (let i = 0; i < data.length; i++) {
      if (i % 4 === 0) totalOpacity += data[i]
      else {
        totalGrey += data[i]
      }
    }

    let avgGrey = totalGrey / 3 / 255 / 9
=======
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
    const colors = ctx.getImageData(x*SCALE, y*SCALE, 1, 1);
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
>>>>>>> 6158dc609ed916990626f6b9e726c95d8ee6cdf9

    console.log({
      x,
      y,
      grey: avgGrey,
      data
    })

<<<<<<< HEAD
    return avgGrey
  }

  const isVisible = (x, y) => {
    const scaleX = Math.floor(x * SCALE)
    const scaleY = Math.floor(y * SCALE)
    const pixels = ctx.getImageData(scaleX - 1, scaleY - 1, 3, 3).data

    const isWhite = pixels.every(v => v === 255)

    return !isWhite
  }

  function getPixelGrayValue(x, y) {
    const pixel = ctx.getImageData(x, y, 1, 1).data
    return 0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2] // Convert to grayscale
=======
    return avgGrey;
  }

  const isVisible = (x, y) => {
    const scaleX = Math.floor(x*SCALE);
    const scaleY = Math.floor(y*SCALE);
    const pixels = ctx.getImageData(scaleX-1, scaleY-1, 3, 3).data;

    const isWhite = pixels.every(v => v === 255);

    return !isWhite;
  }

  function getPixelGrayValue(x, y) {
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return 0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2]; // Convert to grayscale
>>>>>>> 6158dc609ed916990626f6b9e726c95d8ee6cdf9
  }

  return {
    canvas,
    avgGrey,
    isVisible
  }
<<<<<<< HEAD
}
=======

}







>>>>>>> 6158dc609ed916990626f6b9e726c95d8ee6cdf9
