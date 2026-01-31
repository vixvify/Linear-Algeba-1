"use client";

import { useState, useMemo } from "react";
import gaussEliminationPivot from "@/modules/GaussElimination/gaussElimination";
import gaussJordan from "@/modules/GaussJordan/gaussJordan";
import inverseSolve from "@/modules/Inverse/inverseSolve";
import luSolve from "@/modules/Lu/luSolve";
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
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl space-y-10">
        <div className="rounded-2xl border bg-card shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Equations</h2>
            <p className="text-sm text-muted-foreground">
              Enter your system of linear equations
            </p>
          </div>

          <div className="p-6">
            <textarea
              className="
            w-full min-h-35 resize-none
            rounded-xl border
            bg-background
            px-4 py-3
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
          "
              value={equation}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEquation(e.target.value)
              }
              placeholder={`2x + y + 3z = 1
4x + 3y + 5z = 1
6x + 5y + 5z = -3`}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-card shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Methods</h2>
            <p className="text-sm text-muted-foreground">
              Choose a numerical method
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                className={`
              rounded-xl border px-4 py-4 text-sm font-medium
              transition
              ${
                methods === "GaussElimination"
                  ? "border-blue-600 ring-1 ring-blue-600 bg-blue-50 text-blue-700"
                  : "hover:bg-muted"
              }
            `}
                onClick={() => setMethods("GaussElimination")}
              >
                Gauss Elimination
                <div className="text-xs text-muted-foreground mt-1">
                  with pivoting
                </div>
              </button>

              <button
                className={`
              rounded-xl border px-4 py-4 text-sm font-medium
              transition
              ${
                methods === "GaussJordan"
                  ? "border-blue-600 ring-1 ring-blue-600 bg-blue-50 text-blue-700"
                  : "hover:bg-muted"
              }
            `}
                onClick={() => setMethods("GaussJordan")}
              >
                Gauss–Jordan
                <div className="text-xs text-muted-foreground mt-1">
                  elimination
                </div>
              </button>

              <button
                className={`
              rounded-xl border px-4 py-4 text-sm font-medium
              transition
              ${
                methods === "Lu"
                  ? "border-blue-600 ring-1 ring-blue-600 bg-blue-50 text-blue-700"
                  : "hover:bg-muted"
              }
            `}
                onClick={() => setMethods("Lu")}
              >
                LU
                <div className="text-xs text-muted-foreground mt-1">
                  factorization
                </div>
              </button>

              <button
                className={`
              rounded-xl border px-4 py-4 text-sm font-medium
              transition
              ${
                methods === "Inverse"
                  ? "border-blue-600 ring-1 ring-blue-600 bg-blue-50 text-blue-700"
                  : "hover:bg-muted"
              }
            `}
                onClick={() => setMethods("Inverse")}
              >
                Inverse
                <div className="text-xs text-muted-foreground mt-1">
                  matrix method
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Result</h2>
          </div>

          <div className="p-6">
            <div
              className="
            grid grid-cols-1 md:grid-cols-2 gap-6
            rounded-xl border bg-muted/40 p-6
            min-h-45
          "
            >
              <div className="space-y-3">
                {result ? (
                  <div className="flex flex-wrap gap-3">
                    {result.map((v, i) => (
                      <div
                        key={i}
                        className="
                      rounded-lg border bg-background
                      px-3 py-2 text-sm font-mono
                    "
                      >
                        x{i + 1} = {v.toFixed(3)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No result</div>
                )}
              </div>

              <div className="space-y-3">
                {inverse_matrix && (
                  <>
                    <h3 className="text-sm font-semibold">Inverse matrix</h3>

                    <div
                      className="
                    max-h-50 overflow-auto
                    rounded-lg border bg-background p-3
                  "
                    >
                      <pre className="text-xs font-mono leading-relaxed">
                        {matrixToPrettyString(inverse_matrix)}
                      </pre>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
