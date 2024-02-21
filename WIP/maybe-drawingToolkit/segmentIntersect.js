export function segmentIntersect(l1p1, l1p2, l2p1, l2p2) {
  const d = (l2p2[1] - l2p1[1]) * (l1p2[0] - l1p1[0]) - (l2p2[0] - l2p1[0]) * (l1p2[1] - l1p1[1]);
  if (d === 0) return false;
  const n_a = (l2p2[0] - l2p1[0]) * (l1p1[1] - l2p1[1]) - (l2p2[1] - l2p1[1]) * (l1p1[0] - l2p1[0]);
  const n_b = (l1p2[0] - l1p1[0]) * (l1p1[1] - l2p1[1]) - (l1p2[1] - l1p1[1]) * (l1p1[0] - l2p1[0]);
  const ua = n_a / d;
  const ub = n_b / d;
  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return true; // Intersection point is not needed, just the fact of intersection
  }
  return false;
}