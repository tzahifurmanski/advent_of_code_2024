/**
 * Advent of Code 2024 - Day 6
 *
 * Simulates a guard's patrol path through a mapped area, tracking
 * distinct positions visited before the guard exits the boundaries.
 * The guard follows a protocol: move forward, or turn right 90° if
 * an obstacle is encountered.
 *
 */
import * as fs from "fs";

function performNextStep(
  map: string[][],
  guardLocation: [number, number],
  visitedLocations: Set<string>
): boolean {
  // Calculate next step
  const currDirection = map[guardLocation[0]][guardLocation[1]];
  const nextStep: [number, number] = STEPS_MAP.get(currDirection) || [0, 0];
  const nextLocation: [number, number] = [
    guardLocation[0] + nextStep[0],
    guardLocation[1] + nextStep[1],
  ];

  // Check if next step is outside of boundaries, as we've completed the route
  if (
    nextLocation[0] >= map.length ||
    nextLocation[0] < 0 ||
    nextLocation[1] >= map[0].length ||
    nextLocation[1] < 0
  ) {
    return true;
  }

  // Check if next step is hitting a wall (#), and therefore needs to rotate (turn right)
  if (map[nextLocation[0]][nextLocation[1]] == "#") {
    map[guardLocation[0]][guardLocation[1]] =
      DIRECTIONS_MAP.get(currDirection) || "";
    return false;
  }

  // Perform step (and mark the current location as 'visited')
  map[nextLocation[0]][nextLocation[1]] = currDirection;

  guardLocation[0] = nextLocation[0];
  guardLocation[1] = nextLocation[1];

  visitedLocations.add(JSON.stringify(guardLocation));

  return false;
}

const INPUT_FILE = "day6_input.txt";
const DIRECTIONS_MAP: Map<string, string> = new Map([
  ["^", ">"],
  [">", "v"],
  ["v", "<"],
  ["<", "^"],
]);
const STEPS_MAP: Map<string, [number, number]> = new Map([
  ["^", [-1, 0]],
  [">", [0, 1]],
  ["v", [1, 0]],
  ["<", [0, -1]],
]);

let guardLocation: [number, number] = [-1, -1];
let visitedLocations = new Set<string>();

const map: string[][] = [];
try {
  const lines: string[] = fs.readFileSync(INPUT_FILE, "utf-8").split(/\r?\n/);

  // Load the map and the guard's starting position
  for (let index = 0; index < lines.length; index++) {
    const splittedLine = lines[index].split("");
    map.push(splittedLine);

    if (splittedLine.includes("^")) {
      guardLocation = [index, splittedLine.indexOf("^")];
      visitedLocations.add(JSON.stringify(guardLocation));
    }
  }

  let foundExit = false;
  // TODO: This will never stop if the map is corrupted and the guard can't find it's way out
  while (!foundExit) {
    foundExit = performNextStep(map, guardLocation, visitedLocations);
  }

  console.log(`Num of distinct visited locations: ${visitedLocations.size}`);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
