"use client";

import { useState, useMemo } from "react";
import gaussEliminationPivot from "@/service/GaussElimination/gaussElimination.service";
import gaussJordan from "@/service/GaussJordan/gaussJordan.service";
import inverseSolve from "@/service/Inverse/inverseSolve.service";
import luSolve from "@/service/Lu/luSolve.service";
import parseEquations from "@/service/parseEquations.service";

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
      return inverseSolve(A, b);
    }

    return null;
  }, [equation, methods]);

  return (
    <div className="min-h-screen p-8 bg-background text-foreground flex justify-center items-center">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Linear System Solver</h1>
        <div className="border rounded-xl p-4 bg-card">
          <h2 className="font-medium mb-3">Equation</h2>
          <textarea
            className="border border-white w-full h-30 text-white"
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
          <div className="h-40 border rounded-lg bg-gray-50 flex items-center justify-center text-black text-sm">
            {result
              ? result.map((v, i) => (
                  <div key={i} className="p-2">
                    x{i + 1} = {v.toFixed(3)}
                  </div>
                ))
              : "No result"}
          </div>
        </div>
      </div>
    </div>
  );
}
