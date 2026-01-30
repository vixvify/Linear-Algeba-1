import inverseMatrix from "./inverseMatrix.service";

export default function inverseSolve(A: number[][], b: number[]) {
  const inv = inverseMatrix(A);
  const n = A.length;

  const x = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      x[i] += inv[i][j] * b[j];
    }
  }

  return x;
}
