import { flatten, pipe, sum } from "ramda";
import { input } from "./input.mjs";

const input2 = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim();

const lines = input.split("\n").slice(0);

// result of each line should be an object with NUMS as keys

const NUMS = "0123456789";

const processRow = (r, rIdx) => {
  const output = {};
  let currentNum = "";
  let currentSet = new Set();
  let notToCheckSet = new Set();
  for (let cIdx = 0; cIdx < r.length + 1; cIdx++) {
    const c = r[cIdx];
    const currentCoord = `${rIdx},${cIdx}`;
    if (NUMS.includes(c)) {
      currentNum += c;
      notToCheckSet.add(currentCoord);
      const coordsToAdd = getSurroundingCoords([rIdx, cIdx]);
      coordsToAdd.forEach((coord) => {
        currentSet.add(coord);
      });
      continue;
    } else if (currentNum.length > 0) {
      output[currentNum + "_" + currentCoord] = new Set(
        [...currentSet].filter((c) => !notToCheckSet.has(c)),
      );
      currentNum = "";
      currentSet = new Set();
    }
  }
  return output;
};

function getSurroundingCoords([rIdx, cIdx]) {
  const DELTAS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const a = DELTAS.map(([dr, dc]) => {
    return [rIdx + dr, cIdx + dc];
  }).filter((c) => {
    const outOfBounds = c.some((v) => v < 0 || v > 139);
    return !outOfBounds;
  });

  return a.map((c) => c.join(","));
}

const checkSet = (set, grid) => {
  for (let coordString of set) {
    const [r, c] = coordString.split(",");
    if (!grid[r]?.[c]) continue;
    if (grid[r]?.[c] !== ".") return true;
  }
  return false;
};

const a = lines.map(processRow);

const b = a.map((hash) => {
  const entries = Object.entries(hash);
  return entries
    .filter((e) => {
      const [_key, set] = e;
      return checkSet(set, lines);
    })
    .map((e) => {
      const [key] = e;
      return +key.split("_")[0];
    });
});

console.log(pipe(flatten, sum)(b));

/* failed attempts: 
309721
524899
*/
