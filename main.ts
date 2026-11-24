// Everyday Things, Two Lines — rain, explained to a 10-year-old.
// The program writes the two-line entry to /output/entry.txt.
// Both lines are embedded here as literals: the grader runs this program
// against the GitHub repo only, so it must not read any other file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Line 1: one vivid sentence, one analogy a 10-year-old can picture —
// the sky wringing out a giant sponge over the roofs and streets.
// Line 2: one sentence on what the analogy maps (clouds really do hold
// water until they can't) and what it leaves out (nobody is squeezing;
// the drops fall when they grow heavy and cold enough to drop).
const LINE_ONE =
  "Rain is the sky wringing out a giant sponge, squeezing water down onto the roofs and streets below.";
const LINE_TWO =
  "The sponge fits because clouds really do hold water until they can't hold it anymore, but no one is squeezing them — the water falls when tiny drops grow heavy and cold enough to drop.";

const ENTRY = `${LINE_ONE}\n${LINE_TWO}\n`;
// Verified locally 2026-11-24: the entry is 285 characters, two lines,
// inside the kit's 1-400 gate.

// Gate from the kit: entry.txt must be UTF-8 text of 1 to 400 characters,
// not only whitespace.
const GATE_MIN = 1;
const GATE_MAX = 400;

function entryIsValid(text) {
  const chars = [...text].length;
  if (chars < GATE_MIN || chars > GATE_MAX) return false;
  if (text.trim().length === 0) return false;
  // Exactly two non-empty lines: the explanation and its honest second line.
  const lines = text.trimEnd().split("\n");
  if (lines.length !== 2) return false;
  return lines.every((line) => line.trim().length > 0);
}

function outputDir() {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function main() {
  if (!entryIsValid(ENTRY)) {
    throw new Error("entry fails the 1-400 character, two-line gate");
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), ENTRY, "utf8");
}

main();
