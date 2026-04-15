# Daily Review

## Features
- Boot greeting message
- Automatic GitHub review (no user input)
- Writing file discovery and per-file self-grade collection
- Reading page count prompt
- Consolidated feedback message
- Progress view prompt

## Flow (sequential messages)

### Message 1 — Greeting + GitHub Review
- Sisyphus greets user by name or generically.
- Immediately begins git review without waiting for input.
- Displays: "Reviewing your commits from yesterday..."
- Calls coding module; result stored, not displayed yet.

### Message 2..N — Writing Self-Grades
- Writing module finds all writing files from yesterday.
- If zero files found: skip writing section, note "No writing files found for yesterday."
- If one or more files: for each file in order:
  - Sisyphus: "I found `{filename}`. How would you grade this piece? [F, C-, C, C+, B-, B, B+, A-, A]"
  - User enters grade. Validate input against allowed grades. Re-prompt on invalid.
  - Store grade for that file.
- After all files graded, store average grade.

### Message 3 — Reading
- Sisyphus: "How many pages did you read today?"
- User enters integer ≥ 0. Re-prompt on non-integer.
- Store value.

### Message 4 — Feedback
Single message covering all three categories:
- Coding feedback (see coding.md)
- Writing feedback (see writing.md)
- Reading feedback (see reading.md)
Each section: adequacy (yes/no), letter grade, 1–2 sentence comment on trend vs. yesterday/week/month (skip trend if no prior data).

### Message 5 — Progress Prompt
- "Want to see your overall progress? Press `o`."
- If `o` pressed: open progress view (see progress.md).
- Any other key or enter: exit app.

## Data Written
Writes to `~/.sisyphus/data/YYYY-MM-DD.json` at end of session:
```json
{
  "date": "2026-04-14",
  "coding": { "completionGrade": "adequate|inadequate", "valueGrade": "B+", "feedback": "..." },
  "writing": { "files": ["s4/14"], "selfGrades": ["A-"], "averageGrade": "A-", "wordCount": 2300 },
  "reading": { "pages": 45, "adequate": false }
}
```
