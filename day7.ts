/**
 * Advent of Code 2024 - Day 7
 *
 * Generates all possible operator combinations (+, *) for calibration equations
 * and evaluates them left-to-right to find equations matching their test values.
 *
 * Part 2: Adds concatenation operator (||) as a third operator option.
 */
import * as fs from "fs";

const INPUT_FILE = "day7_input.txt";
// const INPUT_FILE = "day7_input copy.txt";

const OPERATIONS = ["+", "*", "||"];
const NUMBERS_REGEX = /\d+/g;
const OPERATORS_REGEX = /[+*]|\|\|/g;

type Operator = "+" | "*" | "||";
const OPERATIONS_FUNCTIONS: Record<Operator, (a: number, b: number) => number> =
  {
    "+": (a: number, b: number) => a + b,
    "*": (a: number, b: number) => a * b,
    "||": (a: number, b: number) => Number(String(a) + String(b)),
  };

function generateExpressionPermutations(
  currentExpression: string,
  suffix: string
): string[] {
  for (let index = 0; index < suffix.length; index++) {
    const character = suffix[index];

    // If it's a number, add it to the string and continue
    if (character != " ") {
      currentExpression += character;
      continue;
    }

    // We've found space, recursively branch into the different operation options
    const permutations: string[] = [];
    for (const operation of OPERATIONS) {
      permutations.push(
        ...generateExpressionPermutations(
          currentExpression + operation,
          suffix.substring(index + 1)
        )
      );
    }
    return permutations;
  }

  // When the expression ends with a number, return the 'finalized' expression (stop condition for the recursion)
  return [currentExpression];
}

// Since operators are always evaluated left-to-right, and not according to precedence rules, I need to implement the evaluation
function evaluateExpression(expression: string): string {
  const numbers = expression.match(NUMBERS_REGEX) || [];
  const operators = expression.match(OPERATORS_REGEX) || [];

  let result = Number(numbers[0]);
  for (let index = 0; index < operators.length; index++) {
    const operator = operators[index];
    const numB = numbers[index + 1];
    result = OPERATIONS_FUNCTIONS[operator as Operator](result, Number(numB));
  }

  return String(result);
}

try {
  const lines: string[] = fs.readFileSync(INPUT_FILE, "utf-8").split(/\r?\n/);

  let sumOfCorrectExpressions = 0;
  for (let index = 0; index < lines.length; index++) {
    const [result, initialExpression] = lines[index].split(":");

    const permutations: string[] = generateExpressionPermutations(
      "",
      initialExpression.trim()
    );

    for (const permutation of permutations) {
      if (result === evaluateExpression(permutation)) {
        sumOfCorrectExpressions += Number(result);

        // No need to check other permutations
        break;
      }
    }
  }

  console.log(`Sum: ${sumOfCorrectExpressions}`);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
