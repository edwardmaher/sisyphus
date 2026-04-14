# Reading

## Features
- User-inputted page count
- Completion grade (60 page threshold)
- Trend commentary (completion only, no value grade)

## Input
Prompt: "How many pages did you read today?"
Accept non-negative integer. Re-prompt on invalid input (non-integer, negative).

## Completion Grade
pages ≥ 60 → "adequate"; else "inadequate".

## Trend Commentary
Load historical reading records.
Compare pages read vs. yesterday, 7-day average, 30-day average.
Skip periods with insufficient data.
Commentary is plain text generated locally (no Gemma call needed for reading).

Example:
- "You read 45 pages. That's down from your 7-day average of 62."
- "You read 72 pages. New personal best this month."

## Output Shape
```ts
{
  pages: number,
  completionGrade: "adequate" | "inadequate",
  trendNote: string | null
}
```
