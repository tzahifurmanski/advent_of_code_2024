"use strict";
/**
 * Advent of Code 2024 - Day 1
 *
 * Reads pairs of location IDs, sorts each list independently,
 * then calculates the sum of absolute differences between
 * corresponding positions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var INPUT_FILE = "day1_input.txt";
try {
    var lines = fs
        .readFileSync(INPUT_FILE, "utf-8")
        .split(/\r?\n/)
        .filter(function (line) { return line.trim(); });
    var listA = [];
    var listB_1 = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var _a = line.trim().split(/\s+/).map(Number), a = _a[0], b = _a[1];
        if (isNaN(a) || isNaN(b)) {
            throw new Error("Invalid input: ".concat(line));
        }
        listA.push(a);
        listB_1.push(b);
    }
    listA.sort(function (a, b) { return a - b; });
    listB_1.sort(function (a, b) { return a - b; });
    var sumOfDistances = listA.reduce(function (sum, a, i) { return sum + Math.abs(a - listB_1[i]); }, 0);
    console.log(sumOfDistances);
}
catch (error) {
    console.error("Error: ".concat(error instanceof Error ? error.message : String(error)));
    process.exit(1);
}
