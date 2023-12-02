import { input } from "./input.mjs";
import { test } from "./test.mjs";

const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

const processLine = (line) => {
  const [g, d] = line.split(": ");
  const gameId = +g.replace("Game ", "");
  const revs = d.split("; ").map((s) => {
    const x = s.split(", ").reduce((acc, m) => {
      const [v, k] = m.split(" ");
      return {
        ...acc,
        [k]: +v,
      };
    }, {});
    return x;
  });

  return revs.every(checkSet) ? gameId : 0;
};

function checkSet(set) {
  return Object.entries(LIMITS).every((entry) => {
    const [color, limit] = entry;
    const n = set[color] || 0;
    return n <= limit;
  });
}

const arr = input.split("\n");

console.log(
  arr.reduce((acc, line) => {
    return acc + processLine(line);
  }, 0)
);
