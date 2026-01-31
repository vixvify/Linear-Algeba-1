export default function luDecomposition(A: number[][]) {
  const n = A.length;

  const L = Array.from({ length: n }, () => Array(n).fill(0));
  const U = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let k = i; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * U[j][k];
      }
      U[i][k] = A[i][k] - sum;
    }

    L[i][i] = 1;

    for (let k = i + 1; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[k][j] * U[j][i];
      }
      L[k][i] = (A[k][i] - sum) / U[i][i];
    }
  }

  return { L, U };
}
