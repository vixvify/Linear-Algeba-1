"use client";

import { useState, useMemo } from "react";
import gaussEliminationPivot from "@/modules/GaussElimination/gaussElimination";
import gaussJordan from "@/modules/GaussJordan/gaussJordan";
import inverseSolve from "@/modules/Inverse/inverseSolve";
import luSolve from "@/modules/Lu/luSolve.service";
import parseEquations from "@/modules/parseEquations";
import matrixToPrettyString from "@/modules/matrixToPrettyString";

export default function LinearSystemUI() {
  const [equation, setEquation] = useState("");
  const [methods, setMethods] = useState("");

  const result = useMemo(() => {
    if (!equation || !methods) return null;

    const { A, b } = parseEquations(equation);

    if (methods === "GaussElimination") {
      return gaussEliminationPivot(A, b);
    }

    if (methods === "GaussJordan") {
      return gaussJordan(A, b);
    }

    if (methods === "Lu") {
      return luSolve(A, b);
    }

    if (methods === "Inverse") {
      return inverseSolve(A, b).x;
    }

    return null;
  }, [equation, methods]);

  const inverse_matrix = useMemo(() => {
    if (!equation || !methods) return null;

    const { A, b } = parseEquations(equation);

    if (methods === "Inverse") {
      return inverseSolve(A, b).inv;
    }

    return null;
  }, [equation, methods]);

  return (
    <div className="min-h-screen p-8 bg-background text-foreground flex justify-center items-center">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-semibold">Linear System Solver</h1>
        <div className="border rounded-xl p-4 bg-card">
          <h2 className="font-medium mb-3">Equation</h2>
          <textarea
            className="border border-white w-full h-30 text-white p-4"
            value={equation}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEquation(e.target.value)
            }
          ></textarea>
        </div>

        <div className="border rounded-xl p-4 bg-card">
          <h2 className="font-medium mb-4">Methods</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              className={`${methods === "GaussElimination" ? "border border-blue-600" : "border"} rounded-lg px-4 py-3 hover:bg-gray-100 hover:text-black text-sm`}
              onClick={() => setMethods("GaussElimination")}
            >
              Gauss Elimination (with pivoting)
            </button>

            <button
              className={`${methods === "GaussJordan" ? "border border-blue-600" : "border"} rounded-lg px-4 py-3 hover:bg-gray-100 hover:text-black text-sm`}
              onClick={() => setMethods("GaussJordan")}
            >
              Gauss–Jordan Elimination
            </button>

            <button
              className={`${methods === "Lu" ? "border border-blue-600" : "border"} rounded-lg px-4 py-3 hover:bg-gray-100 hover:text-black text-sm`}
              onClick={() => setMethods("Lu")}
            >
              LU Factorization
            </button>

            <button
              className={`${methods === "Inverse" ? "border border-blue-600" : "border"} rounded-lg px-4 py-3 hover:bg-gray-100 hover:text-black text-sm`}
              onClick={() => setMethods("Inverse")}
            >
              Inverse Matrix Method
            </button>
          </div>
        </div>

        <div className="border rounded-xl p-4 bg-card">
          <h2 className="font-medium mb-2">Result</h2>
          <div className="h-40 border rounded-lg bg-gray-50 flex items-center justify-center gap-10 text-black text-sm">
            <div className="flex justify-center items-center gap-3">
              <h2>Answer is </h2>
              {result
                ? result.map((v, i) => (
                    <div key={i} className="p-2">
                      x{i + 1} = {v.toFixed(3)}
                    </div>
                  ))
                : "No result"}
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              {inverse_matrix && <h2>Inverse Matrix is</h2>}
              {inverse_matrix && (
                <pre>{matrixToPrettyString(inverse_matrix)}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
