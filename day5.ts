/**
 * Advent of Code 2024 - Day 5
 *
 * Validates print queue updates against page ordering rules (X|Y means X
 * must appear before Y) and sums the middle page numbers from valid updates.
 *
 * Part 2: Fixes incorrectly-ordered updates by sorting them according to
 * the rules, then sums the middle page numbers from those fixed updates.
 */
import * as fs from "fs";

const INPUT_FILE = "day5_input.txt";

function getMiddleElement(report: number[]): number {
  return report[Math.floor(report.length / 2)];
}

function fixReport(
  reportArray: number[],
  rulesMap: Map<number, number[]>
): number {
  reportArray.sort((n1, n2) => {
    const rulesForN1 = rulesMap.get(n1) || [];
    if (rulesForN1.includes(n2)) {
      return 1;
    }

    const rulesForN2 = rulesMap.get(n2) || [];
    if (rulesForN2.includes(n1)) {
      return -1;
    }

    return 0;
  });

  return getMiddleElement(reportArray);
}

function processReport(
  reportArray: number[],
  rulesMap: Map<number, number[]>
): number {
  // Iterate on the report in reverse, and save numbers in a set
  const processedPages = new Set<number>();
  for (let index = reportArray.length - 1; index >= 0; index--) {
    const currPage: number = reportArray[index];
    processedPages.add(currPage);

    const rules = rulesMap.get(currPage) || [];
    for (const rule of rules) {
      if (processedPages.has(rule)) {
        // This means that the report is incorrect
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

  let sumOfFixedReports = 0,
    sumOfCorrectPages = 0,
    foundEmptyLine = false;

  const rulesMap = new Map<number, number[]>();

  for (const line of lines) {
    if (foundEmptyLine) {
      const reportArray = line.trim().split(",").map(Number);

      const reportMiddlePage = processReport(reportArray, rulesMap);
      if (reportMiddlePage > 0) {
        sumOfCorrectPages += reportMiddlePage;
      } else {
        sumOfFixedReports += fixReport(reportArray, rulesMap);
      }
    } else {
      if (line === "") {
        foundEmptyLine = true;
        continue;
      }

      processRule(line, rulesMap);
    }
  }

  console.log(`Correct pages sum: ${sumOfCorrectPages}`);
  console.log(`Fixed reports sum: ${sumOfFixedReports}`);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
