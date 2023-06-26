let jsr = 69;

export function rand() {
  const max = 4294967295;
  jsr ^= (jsr<<17);
  jsr ^= (jsr>>>13);
  jsr ^= (jsr<<5);
  return (jsr>>>0)/max;
}

export function setRandSeed(number) {
  jsr = number;
}

export function randInRange(min, max) {
  return rand() * (max - min) + min;
}

export function randIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rand() * (max - min + 1) + min);
}