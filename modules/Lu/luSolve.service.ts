import luDecomposition from "./luDecomposition.service";

export default function luSolve(A: number[][], b: number[]) {
  const { L, U } = luDecomposition(A);
  const n = A.length;

  const y = new Array(n);

  for (let i = 0; i < n; i++) {
    let sum = b[i];
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
