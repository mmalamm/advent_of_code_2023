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

const NUMS = "0123456789";

const checkStar = ([r, c], grid) => {
  const cellsToCheck = getSurroundingCoords([r, c]);
  const notToCheckSet = new Set();
  const nums = [];

  for (let coordString of cellsToCheck) {
    const result = getNumAndCoordsSetOfDigits(coordString, grid, notToCheckSet);
    if (!result) continue;
    const { coordSet, num } = result;

    [...coordSet].forEach((cs) => {
      notToCheckSet.add(cs);
    });

    nums.push(num);
  }

  return nums.map(Number);
};

const isNumChar = (c) => c && NUMS.includes(c);

const getNumAndCoordsSetOfDigits = (
  coordString,
  grid,
  notToCheckSet = new Set(),
) => {
  if (notToCheckSet.has(coordString)) return null;
  const [r, c] = coordString.split(",");
  const isDigitCharacter = isNumChar(grid[r][c]);
  if (!isDigitCharacter) return null;
  const coordSet = new Set();

  let currentCellIdx = c;
  while (isNumChar(grid[r][currentCellIdx])) {
    coordSet.add(`${r},${currentCellIdx}`);
    currentCellIdx++;
  }
  currentCellIdx = c - 1;
  while (isNumChar(grid[r][currentCellIdx])) {
    coordSet.add(`${r},${currentCellIdx}`);
    currentCellIdx--;
  }

  const num = [...coordSet]
    .sort((a, b) => {
      const [_ar, ac] = a.split(",");
      const [_br, bc] = b.split(",");
      return ac - bc;
    })
    .map((cs) => {
      const [r, c] = cs.split(",");
      return grid[r][c];
    })
    .join("");

  return { num, coordSet };
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

let sum = 0;

for (let rowIdx = 0; rowIdx < lines.length; rowIdx++) {
  for (let cellIdx = 0; cellIdx < lines.length; cellIdx++) {
    const c = lines[rowIdx][cellIdx];
    if (c === "*") {
      // const coordString = `${rowIdx},${cellIdx}`;
      // const cellsToCheck = getSurroundingCoords([rowIdx, cellIdx]);
      // const output = getNumbersFromCellsToCheck(cellsToCheck, lines);
      // console.log({
      //   coordString,
      //   cellsToCheck,
      //   output,
      // });
      const a = checkStar([rowIdx, cellIdx], lines);
      if (a.length === 2) {
        sum += a[1] * a[0];
      }
    }
  }
}
console.log(sum);
