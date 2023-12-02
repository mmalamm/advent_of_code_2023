import { input } from "./input.mjs";
import { test } from "./test.mjs";

const initO = {
  blue: 0,
  red: 0,
  green: 0,
};

const processLine = (line) => {
  const [g, d] = line.split(": ");
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

  const x = revs.reduce(
    (acc, s) => {
      Object.entries(s).forEach((e) => {
        const [k, v] = e;
        acc[k] = Math.max(acc[k], v);
      });
      return acc;
    },
    { ...initO }
  );
  const p = Object.values(x).reduce((a, b) => a * b);

  return p;
};

const arr = input.split("\n");

console.log(
  arr.reduce((a, b) => {
    return a + processLine(b);
  }, 0)
);
