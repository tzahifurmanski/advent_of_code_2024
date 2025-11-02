/**
 * Advent of Code 2024 - Day 1
 *
 * Part 1: Sorts two lists of location IDs and calculates the sum
 * of absolute differences between corresponding positions.
 *
 * Part 2: Calculates similarity scores by multiplying each left
 * list number by its frequency in the right list, then sums them.
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

  const frequencyMap = new Map<number, number>();

  for (const line of lines) {
    const [a, b] = line.trim().split(/\s+/).map(Number);
    if (isNaN(a) || isNaN(b)) {
      throw new Error(`Invalid input: ${line}`);
    }

    listA.push(a);
    listB.push(b);

    // Update how many times b is present
    frequencyMap.set(b, (frequencyMap.get(b) || 0) + 1);
  }

  listA.sort((a, b) => a - b);
  listB.sort((a, b) => a - b);

  const sumOfDistances = listA.reduce(
    (sum, a, i) => sum + Math.abs(a - listB[i]),
    0
  );
  console.log(`Sum of distances is ${sumOfDistances}`);

  const sumOfSimilarities = listA.reduce(
    (sum, a) => sum + a * (frequencyMap.get(a) || 0),
    0
  );
  console.log(`Sum of similarities is ${sumOfSimilarities}`);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
