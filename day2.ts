/**
 * Advent of Code 2024 - Day 2
 *
 * Validates reactor safety reports by checking if number sequences
 * are consistently increasing or decreasing, with adjacent values
 * differing by 1-3. Counts total safe reports.
 *
 */
import * as fs from "fs";

const INPUT_FILE = "day2_input.txt";

try {
  const lines: string[] = fs
    .readFileSync(INPUT_FILE, "utf-8")
    .split(/\r?\n/)
    .filter((line: string) => line.trim());

  let sum = 0;
  for (const line of lines) {
    const reportNumbers: number[] = line.trim().split(/\s+/).map(Number);
    if (reportNumbers.length < 2) {
      continue;
    }

    let anyErrors: boolean = false;
    let firstDifference = undefined;
    for (let index = 0; index < reportNumbers.length - 1; index += 1) {
      const difference = reportNumbers[index + 1] - reportNumbers[index];
      if (firstDifference === undefined) {
        firstDifference = difference;
      }

      if (firstDifference * difference < 0) {
        anyErrors = true;
        break;
      }

      if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
        anyErrors = true;
        break;
      }
    }

    if (anyErrors) {
      continue;
    }

    sum += 1;
  }

  console.log(sum);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
