export function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
