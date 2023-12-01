import { input } from "./input.mjs";

const lines = input.split('\n');
const nums = '123456789'
const arr = lines.map(line => {
  const left = [...line].find(c => nums.includes(c));
  const right = [...line].reverse().find(c => nums.includes(c))
  return left + right;
})

const a = arr.reduce((a, c) => a + +c, 0);

// console.log(a)