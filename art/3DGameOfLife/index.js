/*
@title: 3D Game of Life
@author: Ethan Standafer
@snapshot: snapshot1.png
*/

const CANVAS_SIZE_X = 400;
const CANVAS_SIZE_Y = 400;
const CUBE_SIZE = 6;
const GRID_SIZE_X = 5;
const GRID_SIZE_Y = 5;
const GRID_DEPTH = 6;

class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vector) {
    return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }

  subtract(vector) {
    return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
  }

  multiply(scalar) {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  rotateX(angle) {
    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);
    return new Vector3(
      this.x,
      this.y * cosTheta - this.z * sinTheta,
      this.y * sinTheta + this.z * cosTheta
    );
  }

  rotateY(angle) {
    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);
    return new Vector3(
      this.x * cosTheta + this.z * sinTheta,
      this.y,
      this.z * cosTheta - this.x * sinTheta
    );
  }

  rotateZ(angle) {
    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);
    return new Vector3(
      this.x * cosTheta - this.y * sinTheta,
      this.x * sinTheta + this.y * cosTheta,
      this.z
    );
  }
}

class Cuboid {
  constructor(size, position = new Vector3(), fov = 90, distance = 5) {
    this.size = size;
    this.position = position;
    this.fov = fov;
    this.distance = distance;
    this.vertices = [
      new Vector3(-size.x / 2, -size.y / 2, -size.z / 2),
      new Vector3(size.x / 2, -size.y / 2, -size.z / 2),
      new Vector3(size.x / 2, size.y / 2, -size.z / 2),
      new Vector3(-size.x / 2, size.y / 2, -size.z / 2),
      new Vector3(-size.x / 2, -size.y / 2, size.z / 2),
      new Vector3(size.x / 2, -size.y / 2, size.z / 2),
      new Vector3(size.x / 2, size.y / 2, size.z / 2),
      new Vector3(-size.x / 2, size.y / 2, size.z / 2),
    ];
    this.edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];
  }

  rotate(angles) {
    this.vertices = this.vertices.map((vertex) =>
      vertex.rotateX(angles.x).rotateY(angles.y).rotateZ(angles.z)
    );
  }

  project(vertex) {
    const adjustedVertex = vertex
      .subtract(this.position)
      .add(this.size.multiply(0.5));
    const scale =
      (Math.min(this.size.x, this.size.y) * this.fov) /
      (this.fov + adjustedVertex.z + this.distance);
    return new Vector3(
      adjustedVertex.x * scale + CANVAS_SIZE_X / 2,
      adjustedVertex.y * scale + CANVAS_SIZE_Y / 2
    );
  }

  renderLines() {
    return this.edges.map(([start, end]) => {
      const startVertex = this.project(this.vertices[start]);
      const endVertex = this.project(this.vertices[end]);
      return [
        [startVertex.x, startVertex.y],
        [endVertex.x, endVertex.y],
      ];
    });
  }
}

class World {
  constructor() {
    this.objects = [];
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  renderAll() {
    return this.objects.flatMap((obj) => obj.renderLines());
  }
}

class GameOfLife {
  constructor(gridSizeX, gridSizeY) {
    this.gridSizeX = gridSizeX;
    this.gridSizeY = gridSizeY;
    this.grid = this.createGrid();
  }

  createGrid() {
    return Array.from({ length: this.gridSizeY }, () =>
      // I would use bt.rand() but it seems to be time-based / RFC
      Array.from({ length: this.gridSizeX }, () =>
        Math.random() < 0.3 ? 1 : 0
      )
    );
  }

  countNeighbors(x, y) {
    return [-1, 0, 1].reduce((count, dy) => {
      return (
        count +
        [-1, 0, 1].reduce((subCount, dx) => {
          if (dx === 0 && dy === 0) return subCount;
          const nx = (x + dx + this.gridSizeX) % this.gridSizeX;
          const ny = (y + dy + this.gridSizeY) % this.gridSizeY;
          return subCount + this.grid[ny][nx];
        }, 0)
      );
    }, 0);
  }

  updateGrid() {
    this.grid = this.grid.map((row, y) =>
      row.map((cell, x) => {
        const neighbors = this.countNeighbors(x, y);
        return cell === 1 && (neighbors < 2 || neighbors > 3)
          ? 0
          : cell === 0 && neighbors === 3
          ? 1
          : cell;
      })
    );
  }

  generateCubes(world, depth) {
    Array.from({ length: depth }, (_, z) => {
      this.grid.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell === 1) {
            const size = new Vector3(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
            const position = new Vector3(
              (x - this.gridSizeX / 2 + 1) * size.x,
              (y - this.gridSizeY / 2 + 1) * size.y,
              z * size.z
            );
            world.addObject(new Cuboid(size, position));
          }
        });
      });
      this.updateGrid();
    });
  }
}

const world = new World();
setDocDimensions(CANVAS_SIZE_X, CANVAS_SIZE_Y);
const gameOfLife = new GameOfLife(GRID_SIZE_X, GRID_SIZE_Y);
gameOfLife.generateCubes(world, GRID_DEPTH);
drawLines(world.renderAll());
