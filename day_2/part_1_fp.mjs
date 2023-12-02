import { input } from "./input.mjs";
// import { test } from "./test.mjs";
import * as _ from "ramda";

const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};
const a = _.pipe(
  _.split("\n"),
  _.map((line) =>
    _.pipe(
      _.split(": "),
      _.last,
      _.split("; "),
      _.map(
        _.pipe(
          _.split(", "),
          _.map(_.pipe(_.split(" "), ([v, k]) => ({ [k]: +v }))),
          _.mergeAll,
        ),
      ),
      _.all(
        _.pipe(
          Object.entries,
          _.map(([k, v]) => v <= LIMITS[k]),
          _.all((b) => b),
        ),
      ),
    )(line)
      ? _.pipe(
          _.split(": "),
          _.reverse,
          _.last,
          _.split(" "),
          _.last,
          Number,
        )(line)
      : 0,
  ),
  _.sum,
);

console.log(a(input));
