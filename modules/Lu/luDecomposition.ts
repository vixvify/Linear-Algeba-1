export default function luDecomposition(A: number[][]) {
  const n = A.length;

  const L = Array.from({ length: n }, () => Array(n).fill(0));
  const U = Array.from({ length: n }, () => Array(n).fill(0));

  const P = Array.from({ length: n }, (_, i) => i);

  const M = A.map((r) => [...r]);

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    let maxVal = Math.abs(M[i][i]);

    for (let r = i + 1; r < n; r++) {
      if (Math.abs(M[r][i]) > maxVal) {
        maxVal = Math.abs(M[r][i]);
        maxRow = r;
      }
    }

    if (maxRow !== i) {
      [M[i], M[maxRow]] = [M[maxRow], M[i]];

      [P[i], P[maxRow]] = [P[maxRow], P[i]];

      for (let j = 0; j < i; j++) {
        [L[i][j], L[maxRow][j]] = [L[maxRow][j], L[i][j]];
      }
    }

    for (let k = i; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * U[j][k];
      }
      U[i][k] = M[i][k] - sum;
    }

    L[i][i] = 1;

    for (let k = i + 1; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[k][j] * U[j][i];
      }
      L[k][i] = (M[k][i] - sum) / U[i][i];
    }
  }

  return { L, U, P };
}
