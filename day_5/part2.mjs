import { pipe } from "ramda";
const _ = require("lodash");
import { input } from "./input.mjs";

// const input = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`;

const SEEDS = input.split("\n\n")[0].split(" ").slice(1).map(Number);
const seed_pairs = _.chunk(SEEDS, 2);

const MAP = input
  .split("\n\n")
  .slice(1)
  .reduce((a, b) => {
    const c = b.split("\n");
    const label = c[0];
    return {
      ...a,
      [label]: c.slice(1),
    };
  }, {});

function doesNumFallIntoRange(num, start, range) {
  return num >= start && num < start + range;
}

const processItem = (mapKey) => (itemNum) => {
  const line = MAP[mapKey].find((str) => {
    const [_destStart, itemStart, range] = str.split(" ").map(Number);
    return doesNumFallIntoRange(itemNum, itemStart, range);
  });

  if (line) {
    const [destStart, itemStart] = line.split(" ").map(Number);
    return destStart + (itemNum - itemStart);
  }

  return itemNum;
};

const arr = Object.keys(MAP).map(processItem);

const fn = pipe(...arr);

let lowest = Infinity;

for (let p of seed_pairs) {
  const [startingNum, rangeLength] = p;
  for (let i = startingNum; i < startingNum + rangeLength; i++) {
    const c = fn(i);
    if (c < lowest) lowest = c;
  }
}

// still timing out

console.log(lowest);
