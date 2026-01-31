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
    <div className="min-h-screen relative overflow-hidden bg-[#0b0f1a] text-slate-100">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-105 w-105 rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-105 w-105 rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 space-y-10">
        {/* header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Linear System Solver
          </h1>
          <p className="text-sm text-slate-400">
            Modern numerical linear algebra playground
          </p>
        </div>

        {/* equation */}
        <section
          className="
            rounded-2xl border border-white/10
            bg-white/5 backdrop-blur-xl
            shadow-xl
            transition
          "
        >
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-medium">Equations</h2>
            <p className="text-xs text-slate-400 mt-1">One equation per line</p>
          </div>

          <div className="p-6">
            <textarea
              className="
                w-full min-h-40 resize-none
                rounded-xl border border-white/10
                bg-black/30
                px-4 py-3
                font-mono text-sm
                text-slate-100
                placeholder:text-slate-500
                outline-none
                transition-all
                focus:border-cyan-400/50
                focus:ring-2 focus:ring-cyan-400/30
                focus:shadow-[0_0_25px_-5px_rgba(34,211,238,0.35)]
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
        </section>

        <section
          className="
            rounded-2xl border border-white/10
            bg-white/5 backdrop-blur-xl
            shadow-xl
          "
        >
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-medium">Method</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select solving algorithm
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ["GaussElimination", "Gauss Elimination", "partial pivoting"],
                ["GaussJordan", "Gauss–Jordan", "reduced row form"],
                ["Lu", "LU factorization", "matrix decomposition"],
                ["Inverse", "Inverse matrix", "A⁻¹b"],
              ].map(([key, title, sub]) => (
                <button
                  key={key}
                  onClick={() => setMethods(key)}
                  className={`
                    group relative overflow-hidden
                    rounded-xl border border-white/10
                    bg-black/30
                    px-5 py-5 text-left
                    transition-all duration-300
                    hover:-translate-y-1 hover:scale-[1.01]
                    hover:border-cyan-400/40
                    hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.25)]
                    ${
                      methods === key
                        ? `
                          border-cyan-400/60
                          shadow-[0_0_35px_-8px_rgba(34,211,238,0.45)]
                        `
                        : ""
                    }
                  `}
                >
                  <div
                    className={`
                      absolute left-0 top-0 h-full w-1
                      bg-linear-to-b from-cyan-400 to-fuchsia-500
                      transition-all duration-300
                      ${
                        methods === key
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-60"
                      }
                    `}
                  />

                  <div className="relative">
                    <div className="font-medium">{title}</div>
                    <div className="text-xs text-slate-400 mt-1">{sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          className="
            rounded-2xl border border-white/10
            bg-white/5 backdrop-blur-xl
            shadow-xl
          "
        >
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-medium">Result</h2>
          </div>

          <div className="p-6">
            <div
              className="
                grid grid-cols-1 md:grid-cols-2 gap-6
                rounded-xl border border-white/10
                bg-black/30 p-6
                min-h-55
              "
            >
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-slate-400">
                  solution
                </div>

                <div
                  className={`
                    flex flex-wrap gap-3
                    transition-all duration-500
                    ${
                      result
                        ? "opacity-100 translate-y-0"
                        : "opacity-40 translate-y-1"
                    }
                  `}
                >
                  {result ? (
                    result.map((v, i) => (
                      <div
                        key={i}
                        className="
                          rounded-lg
                          border border-white/10
                          bg-linear-to-br from-white/10 to-white/5
                          px-3 py-2
                          font-mono text-sm
                          shadow-sm
                          transition-all duration-300
                          hover:-translate-y-0.5
                          hover:shadow-[0_8px_25px_-10px_rgba(236,72,153,0.35)]
                        "
                        style={{
                          animation: "fadeInUp 0.4s ease forwards",
                          animationDelay: `${i * 60}ms`,
                        }}
                      >
                        x{i + 1} = {v.toFixed(3)}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-slate-500">No result</div>
                  )}
                </div>
              </div>

              <div
                className={`
                  space-y-3 transition-all duration-500
                  ${
                    inverse_matrix
                      ? "opacity-100 translate-y-0"
                      : "opacity-40 translate-y-1"
                  }
                `}
              >
                {inverse_matrix && (
                  <>
                    <div className="text-xs uppercase tracking-wider text-slate-400">
                      inverse matrix
                    </div>

                    <div
                      className="
                        max-h-60 overflow-auto
                        rounded-lg
                        border border-white/10
                        bg-black/40
                        p-3
                        font-mono text-xs
                      "
                    >
                      <pre className="leading-relaxed">
                        {matrixToPrettyString(inverse_matrix)}
                      </pre>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
