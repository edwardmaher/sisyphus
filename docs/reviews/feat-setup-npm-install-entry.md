# Review: feat/setup-npm-install-entry

Branch: feat/setup-npm-install-entry → main
Reviewer: Claude Code
Date: 2026-04-15
Features: all setup/* (8 features, all "pass")

---

## Findings

### Correctness

L18 (configWrite.ts): WARN correctness — `writeConfig` hardcodes `writingDir: "~/Documents"` on every call, including `runReconfigure`. Reconfiguring the API key silently resets a user-customised `writingDir` to the default. Fix: in `runReconfigure`, read the existing config first and merge only the `gemmaApiKey` field.

L17 (src/index.ts): NIT correctness — first-run path calls `writeConfig(key)` then `initDataDir()` then returns. If `initDataDir` throws, the user has a valid config but no data dir. Next launch detects config present (not first run) and skips `initDataDir` again, leaving the data dir perpetually absent. Fix: call `initDataDir` before `writeConfig`, or catch and re-throw with a clear message directing the user to `--reconfigure`.

### Security

L23 (configWrite.ts): WARN security — config file is written with default umask permissions (typically 0o644 on most systems), meaning the raw API key is world-readable on multi-user systems. Fix: add `fs.chmodSync(configPath, 0o600)` immediately after `writeFileSync`.

### Quality

L21 (apiKeyPrompt.ts): NIT quality — `let valid: boolean` is declared before the inner `try/catch` that calls `validateApiKey`. The catch block exits via `process.exit(1)`, so TypeScript accepts the definite assignment — but this is fragile. If the `process.exit` is ever removed from the catch, `valid` becomes potentially unread. Fix: use `const valid = await validateApiKey(key)` with throw-based propagation; move `process.exit` to the outer caller.

L7 (configRead.ts): NIT quality — error messages include raw `${err}` which for `Error` instances produces "Error: <message>" (redundant prefix). Fix: use `err instanceof Error ? err.message : String(err)`.

L26 (reconfigure.test.ts): NIT quality — `beforeEach` already spies on `console.log`, then individual tests create a second `logSpy`. The local spy only captures calls after it is created; the double-spy pattern is fragile if log calls are reordered. Fix: use the spy from `beforeEach` consistently.

---

## Summary

All 35 tests pass. Spec compliance is good — all 8 setup features match `docs/spec/setup.md`. The previous critical gap (key not persisted on first run) was addressed in `fix(setup): address PR review`. Two issues remain:

- WARN: `runReconfigure` clobbers `writingDir` with the hardcoded default.
- WARN: Config file written without restricted permissions — API key world-readable on multi-user systems.

Neither is a data-loss or auth-bypass issue in the current single-user CLI context, but the permissions gap is a real security exposure.

---

VERDICT: FAIL

Blocking issues:
1. configWrite.ts — no `chmod 600` after writing config; API key is world-readable on multi-user systems.
2. configWrite.ts L18 — `runReconfigure` calls `writeConfig(key)` which resets `writingDir` to `"~/Documents"`, destroying user customisation.
