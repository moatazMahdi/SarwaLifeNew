export function cornerPath(x: number, y: number, w: number, h: number, r: number, len: number) {
  const x2 = x + w;
  const y2 = y + h;
  return [
    `M${x} ${y + r + len} L${x} ${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} L${x + r + len} ${y}`,
    `M${x2 - r - len} ${y} L${x2 - r} ${y} A${r} ${r} 0 0 1 ${x2} ${y + r} L${x2} ${y + r + len}`,
    `M${x2} ${y2 - r - len} L${x2} ${y2 - r} A${r} ${r} 0 0 1 ${x2 - r} ${y2} L${x2 - r - len} ${y2}`,
    `M${x + r + len} ${y2} L${x + r} ${y2} A${r} ${r} 0 0 1 ${x} ${y2 - r} L${x} ${y2 - r - len}`,
  ].join(' ');
}
