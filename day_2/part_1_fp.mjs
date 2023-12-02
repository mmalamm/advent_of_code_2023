import _ from "lodash/fp";
import { test } from "./test.mjs";
const f = (line) => {
  const a = [
    // Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    _.split(": "),
    _.last, // 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    _.split("; "), // 3 green, 4 blue, 1 red
    _.map(_.split(", ")), // 3 green
    _.map(_.split(" ")), // [3, green]
    _.map(
      _.reduce(
        (acc, [v, k]) => ({
          ...acc,
          [k]: +v,
        }),
        {}
      )
    ), // {green: 3}
  ];
  return _.flow(a)(line);
};

console.log(f(test.split("\n")[0]));
