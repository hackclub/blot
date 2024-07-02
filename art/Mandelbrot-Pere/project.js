/*
@title: Mandelbrot set
@author: Pere G
@snapshot: image.png
*/

const width = 500;
const height = 500;

// Establecer las dimensiones del documento
setDocDimensions(width, height);

// Array para almacenar las líneas finales que se dibujarán
const finalLines = [];

/**
 * Función para determinar si un punto pertenece al conjunto de Mandelbrot
 * @param {number} cx - Coordenada x en el plano complejo
 * @param {number} cy - Coordenada y en el plano complejo
 * @param {number} maxIter - Número máximo de iteraciones
 * @returns {number} - Número de iteraciones antes de escapar, o maxIter si no escapa
 */
function mandelbrot(cx, cy, maxIter) {
  let x = 0.0;
  let y = 0.0;
  let iteration = 0;

  while (x * x + y * y <= 4 && iteration < maxIter) {
    const xNew = x * x - y * y + cx;
    y = 2 * x * y + cy;
    x = xNew;
    iteration++;
  }
  return iteration;
}

// Parámetros del conjunto de Mandelbrot
const minX = -2.5;
const maxX = 1.0;
const minY = -1.5;
const maxY = 1.5;
const maxIter = 100;

// Crear el conjunto de Mandelbrot
for (let px = 0; px < width; px++) {
  for (let py = 0; py < height; py++) {
    // Convertir coordenadas de píxeles a coordenadas del plano complejo
    const cx = minX + (maxX - minX) * px / width;
    const cy = minY + (maxY - minY) * py / height;

    // Calcular el número de iteraciones para el punto (cx, cy)
    const iter = mandelbrot(cx, cy, maxIter);

    // Dibujar el punto si pertenece al conjunto de Mandelbrot
    if (iter === maxIter) {
      finalLines.push([
        [px, py],
        [px + 0.5, py + 0.5]
      ]);
    }
  }
}

// Dibujar las líneas finales en el documento
drawLines(finalLines);
