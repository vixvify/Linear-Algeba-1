import luDecomposition from "./luDecomposition";

export default function luSolve(A: number[][], b: number[]) {
  const { L, U, P } = luDecomposition(A);
  const n = A.length;

  const pb = new Array(n);
  for (let i = 0; i < n; i++) {
    pb[i] = b[P[i]];
  }

  const y = new Array(n);

  for (let i = 0; i < n; i++) {
    let sum = pb[i];
    for (let j = 0; j < i; j++) {
      sum -= L[i][j] * y[j];
    }
    y[i] = sum;
  }

  const x = new Array(n);

  for (let i = n - 1; i >= 0; i--) {
    let sum = y[i];
    for (let j = i + 1; j < n; j++) {
      sum -= U[i][j] * x[j];
    }
    x[i] = sum / U[i][i];
  }

  return x;
}
