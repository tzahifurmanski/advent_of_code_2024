/**
 * Advent of Code 2024 - Day 5
 *
 * Validates print queue updates against page ordering rules (X|Y means X
 * must appear before Y) and sums the middle page numbers from valid updates.
 */
import * as fs from "fs";

const INPUT_FILE = "day5_input.txt";

function getMiddleElement(report: number[]): number {
  return Number(report[Math.floor(report.length / 2)]);
}

function processReport(
  report: string,
  rulesMap: Map<number, number[]>
): number {
  const reportArray = report.trim().split(",").map(Number);

  // Iterate on the report in reverse, and save numbers in a set
  const processedPages = new Set<number>();
  for (let index = reportArray.length - 1; index >= 0; index--) {
    const currPage: number = reportArray[index];
    processedPages.add(currPage);

    const rules = rulesMap.get(currPage) || [];
    for (const rule of rules) {
      if (processedPages.has(rule)) {
        return 0;
      }
    }
  }

  return getMiddleElement(reportArray);
}

function processRule(rule: string, rulesMap: Map<number, number[]>): void {
  const [pageMustComeBefore, page] = rule.trim().split("|").map(Number);
  if (isNaN(page) || isNaN(pageMustComeBefore)) {
    throw new Error(`Invalid input: ${rule}`);
  }

  const rulesArray: number[] = rulesMap.get(page) || [];
  rulesArray.push(pageMustComeBefore);

  if (!rulesMap.has(page)) rulesMap.set(page, rulesArray);
}

try {
  const lines: string[] = fs.readFileSync(INPUT_FILE, "utf-8").split(/\r?\n/);

  let sum = 0;
  let foundEmptyLine = false;

  const rulesMap = new Map<number, number[]>();

  for (const line of lines) {
    if (foundEmptyLine) {
      sum += processReport(line, rulesMap);
    } else {
      if (line === "") {
        foundEmptyLine = true;
        continue;
      }

      processRule(line, rulesMap);
    }
  }

  console.log(sum);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
