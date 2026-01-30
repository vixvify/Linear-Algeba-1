export default function gaussEliminationPivot(A: number[][], b: number[]) {
  const n = A.length;

  A = A.map((r) => r.slice());
  b = b.slice();

  for (let k = 0; k < n - 1; k++) {
    let maxRow = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(A[i][k]) > Math.abs(A[maxRow][k])) {
        maxRow = i;
      }
    }

    [A[k], A[maxRow]] = [A[maxRow], A[k]];
    [b[k], b[maxRow]] = [b[maxRow], b[k]];

    for (let i = k + 1; i < n; i++) {
      const factor = A[i][k] / A[k][k];

      for (let j = k; j < n; j++) {
        A[i][j] -= factor * A[k][j];
      }

      b[i] -= factor * b[k];
    }
  }

  const x = new Array(n);

  for (let i = n - 1; i >= 0; i--) {
    let sum = b[i];
    for (let j = i + 1; j < n; j++) {
      sum -= A[i][j] * x[j];
    }
    x[i] = sum / A[i][i];
  }

  return x;
}
