/**
 * Advent of Code 2024 - Day 6
 *
 * Simulates a guard's patrol path through a mapped area, tracking
 * distinct positions visited before the guard exits the boundaries.
 * The guard follows a protocol: move forward, or turn right 90° if
 * an obstacle is encountered.
 *
 * Part 2: Finds all positions where placing a single obstacle would
 * cause the guard to get stuck in an infinite loop.
 */
import * as fs from "fs";

function performNextStep(
  map: string[][],
  guardLocation: [number, number],
  visitedLocations: Set<string>,
  visitedStates: Set<string>
): string {
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
    nextLocation[1] >= map.length ||
    nextLocation[1] < 0
  ) {
    return "valid";
  }

  // Check if the next step is part of a loop
  if (
    visitedStates.has(`${nextLocation[0]},${nextLocation[1]}` + currDirection)
  ) {
    return "loop";
  }

  // Check if next step is hitting a wall (#), and therefore needs to rotate (turn right)
  if (map[nextLocation[0]][nextLocation[1]] == "#") {
    map[guardLocation[0]][guardLocation[1]] =
      DIRECTIONS_MAP.get(currDirection) || "";
    return "WIP";
  }

  // Perform step (and mark the current location as 'visited')
  guardLocation[0] = nextLocation[0];
  guardLocation[1] = nextLocation[1];
  map[guardLocation[0]][guardLocation[1]] = currDirection;

  visitedStates.add(`${guardLocation[0]},${guardLocation[1]}` + currDirection);
  visitedLocations.add(`${guardLocation[0]},${guardLocation[1]}`);

  return "WIP";
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

let guardInitialPosition: [number, number] = [-1, -1];
let originalVisitedLocations = new Set<string>();
let visitedStates = new Set<string>();

const mapInitialState: string[][] = [];
try {
  const lines: string[] = fs.readFileSync(INPUT_FILE, "utf-8").split(/\r?\n/);

  // Load the map and the guard's starting position
  for (let index = 0; index < lines.length; index++) {
    const splittedLine = lines[index].split("");
    mapInitialState.push(splittedLine);

    if (splittedLine.includes("^")) {
      guardInitialPosition = [index, splittedLine.indexOf("^")];
      originalVisitedLocations.add(
        `${guardInitialPosition[0]},${guardInitialPosition[1]}`
      );
      visitedStates.add(
        `${guardInitialPosition[0]},${guardInitialPosition[1]}` + "^"
      );
    }
  }

  // Run the valid scenario once, and collect the visited locations.
  const guardLocation: [number, number] = [
    guardInitialPosition[0],
    guardInitialPosition[1],
  ];
  const map: string[][] = mapInitialState.map((row) => [...row]);

  let status = "WIP";
  while (status === "WIP") {
    status = performNextStep(
      map,
      guardLocation,
      originalVisitedLocations,
      new Set<string>()
    );
  }

  console.log(
    `Num of distinct visited locations: ${originalVisitedLocations.size}`
  );

  // Go over the visited locations, except the initial one
  let loopCounter = 0;
  for (let location of originalVisitedLocations) {
    const currLocation: string[] = location.split(",");
    const row = Number(currLocation[0]);
    const col = Number(currLocation[1]);

    // Skip the initial location
    if (row == guardInitialPosition[0] && col == guardInitialPosition[1]) {
      continue;
    }

    // Initialize before each round
    const guardLocation: [number, number] = [
      guardInitialPosition[0],
      guardInitialPosition[1],
    ];
    const map: string[][] = mapInitialState.map((row) => [...row]);

    visitedStates.clear();

    // Place a blocker in the empty slot
    map[row][col] = "#";

    let status = "WIP";
    while (status === "WIP") {
      status = performNextStep(
        map,
        guardLocation,
        new Set<string>(),
        visitedStates
      );

      if (status === "loop") {
        loopCounter++;
        break;
      }
    }
  }

  console.log(`Num of loop options: ${loopCounter}`);
} catch (error: unknown) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );

  process.exit(1);
}
