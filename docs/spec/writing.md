# Writing

## Features
- Writing file discovery (filename pattern: `s{M/D}`)
- Word count calculation
- Completion grade (2000 word threshold)
- User self-grade collection (per file, averaged)
- Trend commentary

## File Discovery
Search configured `writingDir` (default `~/Documents`) for files matching:
- Filename starts with `s` followed by date in `M/D` format (e.g., `s4/14` for April 14)
- File's mtime is today or yesterday (within last 24h window)
- Any extension allowed (`.md`, `.txt`, `.docx` — read text only from `.md`/`.txt`)

Algorithm:
1. List all files in `writingDir` (non-recursive unless config `writingDirRecursive: true`).
2. Filter by name regex: `/^s\d{1,2}\/\d{1,2}/` or interpret slash as path separator → check for file `s4` in folder `14`? No — treat full filename literally, OS may reject `/` in filenames. **Clarification needed**: On macOS `/` is invalid in filenames. Assume user means `s4-14` or `s414` format. Implement both: try `s{M/D}` as `s{M}-{D}` and `s{M}{D}` patterns.
3. Return list of matched filenames.

## Word Count
Read file as UTF-8 text. Split on whitespace. Count tokens. Return integer.

## Completion Grade
wordCount ≥ 2000 → "adequate"; else "inadequate".

## Self-Grade
Accepted values: `F, C-, C, C+, B-, B, B+, A-, A` (case-insensitive).
If multiple files: collect one grade per file, average numerically.
Grade map: F=0, C-=1, C=2, C+=3, B-=4, B=5, B+=6, A-=7, A=8.
Average rounded to nearest integer → mapped back to letter.

## Trend Commentary
Load historical writing records from `~/.sisyphus/data/`.
Same pattern as coding: yesterday / 7-day avg / 30-day avg.
Compare word counts and average grades.
Skip periods with no data.

## Output Shape
```ts
{
  files: string[],
  wordCounts: number[],
  totalWords: number,
  completionGrade: "adequate" | "inadequate",
  selfGrades: string[],
  averageGrade: string | null,
}
```
