/**
 * Advent of Code 2024 - Day 4
 *
 * Searches a word search grid for X-MAS patterns, where two "MAS"
 * words (forward or backward) intersect diagonally to form an X shape.
 *
 */
import * as fs from "fs";

const INPUT_FILE = "day4_input.txt";

function checkDiagonal(
  row1: number,
  col1: number,
  row2: number,
  col2: number,
  lines: string[]
): boolean {
  return (
    (lines[row1][col1] === "M" && lines[row2][col2] === "S") ||
    (lines[row1][col1] === "S" && lines[row2][col2] === "M")
  );
}

try {
  const lines: string[] = fs
    .readFileSync(INPUT_FILE, "utf-8")
    .split(/\r?\n/)
    .filter((line: string) => line.trim());

  let sum = 0;

  // Skip the border - 'A' needs all four diagonal corners to be in bounds
  for (let row = 1; row < lines.length - 1; row++) {
    for (let col = 1; col < lines[row].length - 1; col++) {
      // If the middle character does not match, no need to continue
      if (lines[row][col] != "A") {
        continue;
      }

      if (
        checkDiagonal(row - 1, col - 1, row + 1, col + 1, lines) &&
        checkDiagonal(row - 1, col + 1, row + 1, col - 1, lines)
      ) {
        sum++;
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
