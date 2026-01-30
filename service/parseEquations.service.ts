export default function parseEquations(equationsStr: string) {
  const lines = equationsStr
    .trim()
    .split("\n")
    .map((l) => l.replace(/\s+/g, ""));

  const variables = new Set();

  for (const line of lines) {
    const matches = line.match(/[a-zA-Z]/g);
    if (matches) {
      matches.forEach((v) => variables.add(v));
    }
  }

  const vars = Array.from(variables).sort();

  const A = [];
  const b = [];

  for (const line of lines) {
    const [left, right] = line.split("=");

    const row = new Array(vars.length).fill(0);

    const termRegex = /([+-]?[\d.]*)([a-zA-Z])/g;
    let match;

    while ((match = termRegex.exec(left)) !== null) {
      const coefStr = match[1];
      const variable = match[2];

      let coef: number;

      if (coefStr === "" || coefStr === "+") coef = 1;
      else if (coefStr === "-") coef = -1;
      else coef = parseFloat(coefStr);

      const index = vars.indexOf(variable);
      row[index] += coef;
    }

    A.push(row);
    b.push(parseFloat(right));
  }

  return { A, b, vars };
}
