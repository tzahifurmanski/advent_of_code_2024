/**
 * Advent of Code 2024 - Day 2
 *
 * Validates reactor safety reports by checking if number sequences
 * are consistently increasing or decreasing, with adjacent values
 * differing by 1-3.
 *
 * Part 2: Reports are also safe if removing any single element
 * makes them safe (Problem Dampener tolerance).
 */
import * as fs from "fs";

const INPUT_FILE = "day2_input.txt";

function isSafe(report: number[]) {
  if (report.length < 2) {
    return false;
  }

  let firstDifference = undefined;
  for (let index = 0; index < report.length - 1; index += 1) {
    const difference = report[index + 1] - report[index];
    if (firstDifference === undefined) {
      firstDifference = difference;
    }

    if (firstDifference * difference < 0) {
      return false;
    }

    if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
      return false;
    }
  }

  return true;
}

function isSafeWithDampener(reportNumbers: number[]): 0 | 1 {
  // Check if already safe
  if (isSafe(reportNumbers)) return 1;

  // Try removing each element
  for (let i = 0; i < reportNumbers.length; i++) {
    const permutation = reportNumbers.filter((_, index) => index !== i);
    if (isSafe(permutation)) return 1;
  }

  return 0; // No safe permutation found
}

try {
  const lines: string[] = fs
    .readFileSync(INPUT_FILE, "utf-8")
    .split(/\r?\n/)
    .filter((line: string) => line.trim());

  let sum = 0;
  for (const line of lines) {
    const reportNumbers: number[] = line.trim().split(/\s+/).map(Number);
    sum += isSafeWithDampener(reportNumbers);
  }

  console.log(sum);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
