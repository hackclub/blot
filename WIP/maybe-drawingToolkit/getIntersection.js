export function getIntersection(line1Start, line1End, line2Start, line2End) {
  const denominator = ((line2End[1] - line2Start[1]) * (line1End[0] - line1Start[0])) - ((line2End[0] - line2Start[0]) * (line1End[1] - line1Start[1]));
  if (denominator === 0) return null; // lines are parallel

  const a = line1Start[1] - line2Start[1];
  const b = line1Start[0] - line2Start[0];
  const numerator1 = ((line2End[0] - line2Start[0]) * a) - ((line2End[1] - line2Start[1]) * b);
  const numerator2 = ((line1End[0] - line1Start[0]) * a) - ((line1End[1] - line1Start[1]) * b);
  const r = numerator1 / denominator;
  const s = numerator2 / denominator;

  if (r >= 0 && r <= 1 && s >= 0 && s <= 1) {
    return [
      line1Start[0] + (r * (line1End[0] - line1Start[0])),
      line1Start[1] + (r * (line1End[1] - line1Start[1]))
    ];
  }

  return null;
}