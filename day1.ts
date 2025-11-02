/**
 * Advent of Code 2024 - Day 1
 *
 * Reads pairs of location IDs, sorts each list independently,
 * then calculates the sum of absolute differences between
 * corresponding positions.
 */

import * as fs from "fs";

const INPUT_FILE = "day1_input.txt";

try {
  const lines: string[] = fs
    .readFileSync(INPUT_FILE, "utf-8")
    .split(/\r?\n/)
    .filter((line: string) => line.trim());

  const listA: number[] = [];
  const listB: number[] = [];

  for (const line of lines) {
    const [a, b] = line.trim().split(/\s+/).map(Number);
    if (isNaN(a) || isNaN(b)) {
      throw new Error(`Invalid input: ${line}`);
    }

    listA.push(a);
    listB.push(b);
  }

  listA.sort((a, b) => a - b);
  listB.sort((a, b) => a - b);

  const sumOfDistances = listA.reduce(
    (sum, a, i) => sum + Math.abs(a - listB[i]),
    0
  );

  console.log(sumOfDistances);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
