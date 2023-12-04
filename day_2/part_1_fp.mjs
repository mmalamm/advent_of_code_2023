import { input } from "./input.mjs";
import * as R from "ramda";

const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};
const a = R.pipe(
  R.split("\n"),
  R.map((line) =>
    R.pipe(
      R.split(": "),
      R.last,
      R.split("; "),
      R.map(
        R.pipe(
          R.split(", "),
          R.map(R.pipe(R.split(" "), ([v, k]) => ({ [k]: +v }))),
          R.mergeAll,
        ),
      ),
      R.all(
        R.pipe(
          Object.entries,
          R.map(([k, v]) => v <= LIMITS[k]),
          R.all((b) => b),
        ),
      ),
    )(line)
      ? R.pipe(
          R.split(": "),
          R.reverse,
          R.last,
          R.split(" "),
          R.last,
          Number,
        )(line)
      : 0,
  ),
  R.sum,
);

console.log(a(input));
