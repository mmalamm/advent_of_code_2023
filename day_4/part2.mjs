import { range } from "ramda";
import { input } from "./input.mjs";

// const input = `
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
// `.trim();

const lines = input.split("\n");

const stack = lines.map((s) => {
  const ticketId = getTicketIdFromLine(s);
  return ticketId;
});

function getTicketIdFromLine(line) {
  const [g] = line.split(":");
  const n = g.replace("Card ", "");
  return +n;
}

function processLine(line) {
  const l = line.split(": ")[1].trim();
  const [w, h] = l.split(" | ").map((s) => s.split(/\s+/).map(Number));
  const s = new Set(w);

  let x = 0;

  for (let n of h) if (s.has(n)) x++;

  return x;
}

for (let i = 0; i < stack.length; i++) {
  const c = lines[stack[i] - 1];
  const gameId = getTicketIdFromLine(c);
  const n = processLine(c);
  const r = range(gameId + 1, gameId + 1 + n);
  stack.push(...r);
}

console.log(stack.length);
