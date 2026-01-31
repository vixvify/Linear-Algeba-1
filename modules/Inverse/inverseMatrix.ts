export default function inverseMatrix(A: number[][]) {
  const n = A.length;

  const aug = A.map((row, i) => [
    ...row,
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  ]);

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) {
        maxRow = k;
      }
    }

    [aug[i], aug[maxRow]] = [aug[maxRow], aug[i]];

    const pivot = aug[i][i];

    for (let j = 0; j < 2 * n; j++) {
      aug[i][j] /= pivot;
    }

    for (let k = 0; k < n; k++) {
      if (k === i) continue;

      const factor = aug[k][i];
      for (let j = 0; j < 2 * n; j++) {
        aug[k][j] -= factor * aug[i][j];
      }
    }
  }

  return aug.map((r) => r.slice(n));
}
