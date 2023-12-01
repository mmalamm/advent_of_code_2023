import { input } from "./input.mjs";

const o = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numWords = Object.keys(o);
const lines = input.split("\n");
const nums = "123456789";
const arr = lines.map((line) => {
  const leftIdx = [...line].findIndex(finderFn);
  const rightIdx = findFromRight(line);
  const a =
    getNumCharFromIdx(leftIdx, line) + getNumCharFromIdx(rightIdx, line);
  return a;
});

const a = arr.reduce((a, c) => a + +c, 0);
console.log(a);

function findFromRight(line) {
  for (let i = line.length - 1; i >= 0; i--) {
    if (nums.includes(line[i])) return i;
    if (
      numWords.find((word) => {
        const s = line.slice(i);
        if (s.startsWith(word)) return true;
      })
    ) {
      return i;
    }
  }
}

function getNumWordFromIdx(idx, line) {
  return numWords.find((word) => {
    const s = line.slice(idx, idx + 5);
    return s.startsWith(word);
  });
}

function getNumCharFromIdx(idx, line) {
  if (nums.includes(line[idx])) return line[idx];
  const word = getNumWordFromIdx(idx, line);
  return `${o[word]}`;
}

function finderFn(c, idx, oArr) {
  const isDigit = nums.includes(c);
  const isNumWord = numWords.some((k) => {
    return oArr
      .slice(idx, idx + 5)
      .join("")
      .startsWith(k);
  });
  return isDigit || isNumWord;
}
