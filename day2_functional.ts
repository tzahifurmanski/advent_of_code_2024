/**
 * Advent of Code 2024 - Day 2
 *
 * Validates reactor safety reports by checking if number sequences
 * are consistently increasing or decreasing, with adjacent values
 * differing by 1-3. Counts total safe reports.
 *
 * This is less performant than the original version, but is more readable and elegant IMO
 */
import * as fs from "fs";

const INPUT_FILE = "day2_input.txt";

function isSafeReport(numbers: number[]): boolean {
  if (numbers.length < 2) return false;

  // Take all numbers except the last one (We don't need, since we're doing i+1)
  const differences = numbers
    .slice(0, -1)
    .map((num, i) => numbers[i + 1] - num);

  const firstDiff = differences[0];

  //
  return differences.every(
    (diff) => Math.abs(diff) >= 1 && Math.abs(diff) <= 3 && firstDiff * diff > 0
  );
}

try {
  const lines: string[] = fs
    .readFileSync(INPUT_FILE, "utf-8")
    .split(/\r?\n/)
    .filter((line: string) => line.trim());

  const safeCount = lines
    .map((line) => line.trim().split(/\s+/).map(Number))
    .filter(isSafeReport).length;

  console.log(safeCount);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
