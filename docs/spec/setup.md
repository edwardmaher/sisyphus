# Setup

## Features
- npm install + CLI entry point (`sisyphus` command)
- First-run detection
- Gemma API key prompt and validation
- Config persistence

## First-Run Flow
On first launch (`~/.sisyphus/config.json` absent):
1. Print brief explanation: "Sisyphus uses Gemma 4 via Google AI Studio. Get a free API key at https://aistudio.google.com/"
2. Prompt: `Enter your Gemma API key:`
3. Validate: send a minimal test request to Gemma API; if 401/403 → print error, re-prompt; max 3 attempts then exit with message.
4. Write `~/.sisyphus/config.json`: `{ "gemmaApiKey": "...", "firstRun": false }`
5. Proceed to main app.

## Config Schema
```json
{
  "gemmaApiKey": "string",
  "writingDir": "~/Documents",  // default; user can override
  "firstRun": false
}
```

## Error States
- API key invalid after 3 attempts → exit 1, print setup instructions
- Config directory not writable → exit 1, print path

## Notes
- Config stored at `~/.sisyphus/config.json`
- Data stored at `~/.sisyphus/data/YYYY-MM-DD.json`
- Both directories created on first run if absent
