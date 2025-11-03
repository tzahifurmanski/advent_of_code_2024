/**
 * Advent of Code 2024 - Day 3
 *
 * Scans corrupted memory for valid mul(x,y) instructions and
 * calculates the sum of their multiplication results.
 *
 * Part 2: Respects do() and don't() instructions that enable
 * or disable subsequent mul operations.
 */
import * as fs from "fs";

const INPUT_FILE = "day3_input.txt";

try {
  const fileContent: string = fs.readFileSync(INPUT_FILE, "utf-8");

  const mulInstructionRegex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
  const instructions = fileContent.matchAll(mulInstructionRegex);
  let sum = 0;
  let isEnabled: boolean = true;

  for (const match of instructions) {
    switch (match[0]) {
      case "don't()":
        isEnabled = false;
        break;
      case "do()":
        isEnabled = true;
        break;
      default:
        if (isEnabled) {
          sum += Number(match[1]) * Number(match[2]);
        }
    }
  }

  console.log(sum);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
