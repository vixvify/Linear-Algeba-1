export default function matrixToPrettyString(mat: number[][], precision = 3) {
  return mat
    .map((row) =>
      row.map((v) => v.toFixed(precision).padStart(10, " ")).join(" "),
    )
    .join("\n");
}
