# Agent

## Features
- Gemma 4 API client (REST, no SDK)
- Prompt template loading
- Personality file integration
- Streaming response support
- Response parsing utilities

## Gemma API Client
Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key={API_KEY}`
(Use whatever Gemma 4 model ID Google AI Studio provides; make model ID configurable in config.)

Request shape:
```json
{
  "contents": [{ "parts": [{ "text": "..." }] }],
  "generationConfig": { "maxOutputTokens": 512 }
}
```

Response: parse `candidates[0].content.parts[0].text`.

Error handling:
- 401/403 → "Invalid API key. Run `sisyphus --reconfigure`."
- 429 → "Rate limited. Retrying in 5s..." (retry once)
- 5xx → "Gemma API unavailable." (no retry, surface error)

## Prompt Templates
Stored in `src/prompts/`:
- `coding-review.txt` — coding diff review prompt
- `yelling-tirade.txt` — missed day tirade prompt
- `apology-eval.txt` — apology genuineness evaluation prompt
- `daily-feedback.txt` — combined daily feedback prompt

Each template uses `{{variable}}` interpolation (simple string replace).

## Personality
`src/prompts/personality.md` — character notes for Sisyphus's tone.
Prepended to every Gemma system prompt as a preamble.
Left blank initially; user fills manually.

## Streaming
If Gemma supports streaming (`streamGenerateContent`), use it to display tokens progressively in chat. Fall back to non-streaming if unavailable.

## Utilities
- `gradeToNumber(grade: string): number` — maps letter grade to 0–8
- `numberToGrade(n: number): string` — reverse map
- `averageGrades(grades: string[]): string` — numeric average → letter
- `loadHistory(days: number): DayRecord[]` — reads last N day files
