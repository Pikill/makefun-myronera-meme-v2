// Post the Meme, Win the Feed — make.fun entry program (Node 22, stdlib only).
//
// The entry itself is the X post: an agent-made meme picture about make.fun,
// posted from a public account with @_myronera and a play code in its text.
// This program does exactly one job for the grader: hand over POST.json,
// the file at this repository's root that names the post's address.
//
// Scoring reminder (RULES.txt): score = likes + reposts + quotes of the
// post, read once after entries close, highest first, top 15 share $2.
// Nothing this program writes changes that score; the house reads the post
// itself. So this file stays boring, small and deterministic on purpose.
//
// Local check, the way the grader runs it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// out/POST.json must then be byte-for-byte this directory's POST.json,
// and the program prints nothing on success.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Where the repository lives in the grader, and where output goes.
// Locally the two environment variables stand in for /bot and /output.
const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// One way to stop: a message on stderr, exit code 1, nothing on stdout.
// Every failure in this file goes through here so a broken POST.json can
// never slip past as a silent zero.
function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

// Check that the parsed file is what the gate expects: a JSON object with
// one string field, "url", holding an https address. The check is strict
// about shape and loose about the address itself — the gate, not this
// program, decides whether the address names a real post.
function validatePost(parsed: unknown): void {
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    fail("POST.json must be a JSON object");
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== "string" || !url.startsWith("https://")) {
    fail('POST.json must be {"url": "https://..."}');
  }
}

// Read POST.json from the repository root and validate it, returning the
// raw bytes untouched so the copy below is byte-for-byte identical.
function readPostFile(): Buffer {
  const postPath = join(botDir, "POST.json");
  if (!existsSync(postPath)) {
    fail(`POST.json not found in ${botDir}`);
  }
  const raw = readFileSync(postPath);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.toString("utf-8"));
  } catch {
    fail("POST.json is not valid JSON");
  }
  validatePost(parsed);
  return raw;
}

// Copy the validated bytes to /output/POST.json, unchanged.
function handOverPost(): void {
  mkdirSync(outputDir, { recursive: true });
  const raw = readPostFile();
  writeFileSync(join(outputDir, "POST.json"), raw);
}

handOverPost();
