# sisyphus

## Stack
Language: TypeScript (Node.js)
Database: JSON flat files (~/.sisyphus/data/)
Test command: npx jest
Lint command: npx eslint src/
Format command: npx prettier --write src/

## Patterns
- Error handling: throw Error with descriptive message; catch at top-level entry points only
- Imports: absolute paths from src/ using tsconfig paths
- Tests: colocated in __tests__/, mirror src/ structure
- Naming: camelCase functions, PascalCase components/classes, SCREAMING_SNAKE for constants
- UI: Ink (React for terminal) for layout; blessed fallback only if Ink insufficient
- AI: Gemma 4 via Google AI Studio REST API (fetch, no SDK)
- Config: ~/.sisyphus/config.json for API key and user settings
- Data: ~/.sisyphus/data/YYYY-MM-DD.json per-day records

## Reference
- Spec: docs/spec/ (per-category files)
- Architecture: docs/architecture.md
- Feature status: feature_list.json
