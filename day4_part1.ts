/**
 * Advent of Code 2024 - Day 4
 *
 * Searches a word search grid for all instances of "XMAS" appearing
 * in any of the eight directions (horizontal, vertical, and diagonal).
 */
import * as fs from "fs";

const INPUT_FILE = "day4_input.txt";
const WORD_TO_SEARCH = "XMAS";
const WORD_SUFFIX = WORD_TO_SEARCH.slice(1);
const DIRECTIONS = [
  { row: 0, col: 1 },
  { row: 0, col: -1 },
  { row: 1, col: 0 },
  { row: -1, col: 0 },
  { row: 1, col: 1 },
  { row: -1, col: -1 },
  { row: -1, col: 1 },
  { row: 1, col: -1 },
];

function findWordInDirection(
  word: string,
  rowIndex: number,
  colIndex: number,
  lines: string[],
  direction: {
    row: number;
    col: number;
  }
): boolean {
  for (const currChar of word) {
    // Take a step in the given direction
    rowIndex += direction.row;
    colIndex += direction.col;

    // If index is out of bounds, exit
    if (
      rowIndex < 0 ||
      colIndex < 0 ||
      rowIndex >= lines.length ||
      colIndex >= lines[0].length
    ) {
      return false;
    }

    // If the new index does not have right character, exit
    if (lines[rowIndex][colIndex] != currChar) {
      return false;
    }
  }

  return true;
}

try {
  const lines: string[] = fs
    .readFileSync(INPUT_FILE, "utf-8")
    .split(/\r?\n/)
    .filter((line: string) => line.trim());

  let sum = 0;

  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      // If the first character does not match, no need to continue
      if (lines[row][col] != WORD_TO_SEARCH[0]) {
        continue;
      }

      // Check for the rest of the word in every possible direction
      for (const direction of DIRECTIONS) {
        if (findWordInDirection(WORD_SUFFIX, row, col, lines, direction)) {
          sum++;
        }
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
