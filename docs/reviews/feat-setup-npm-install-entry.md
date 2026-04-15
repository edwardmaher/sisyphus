# PR Review: feat/setup-npm-install-entry

Branch: `feat/setup-npm-install-entry` → `main`
Reviewed: 2026-04-15
Features: all `setup/*` (8 features, all `"pass"`)

---

## Findings

### Correctness

L10 (index.ts): WARN correctness — `main()` on first run calls `promptApiKey()` but never calls `writeConfig()` or `initDataDir()`. After a successful key prompt on first run, config is not persisted and data dir is never created; next launch will re-prompt infinitely. Fix: call `writeConfig(key)` and `initDataDir()` after `promptApiKey()` in the first-run branch.

L21 (index.ts): WARN correctness — `main` is exported but `main().catch(...)` executes at module load time. Any consumer `import`ing `main` will trigger the CLI side-effect on import. Fix: guard the `main()` call with `if (require.main === module)`.

L2 (apiKeyValidation.ts): NIT quality — Model name is `gemma-3-27b-it` but spec says "Gemma 4". Either the URL is wrong (hardcoded to Gemma 3) or the spec is aspirational. Confirm correct model endpoint.

### Security

L5 (apiKeyValidation.ts): WARN security — API key is passed as a URL query param (`?key=...`). This exposes the key in server logs, proxy logs, and Node's built-in URL access logs. Fix: pass as `x-goog-api-key` header or `Authorization: Bearer` header instead.

### Quality

L5 (configRead.ts): NIT quality — `SisyphusConfig` interface is duplicated identically in `configRead.ts` and `configWrite.ts`. Extract to a shared `src/setup/types.ts` and import from both.

L82 (apiKeyPrompt.test.ts): NIT quality — Test comment says "skips empty input and counts as an attempt" but the test name and assertion verify all three attempts are empty and we exit — the description is slightly misleading (empty input does consume an attempt slot). Minor doc fix only.

---

## Summary

The implementation is solid for a first PR. Test coverage is thorough (33 tests, all pass). The critical gap is **the first-run path does not write config or init data dir**, meaning the app will loop into setup on every launch. This is a spec violation (`setup.md` step 4: write config on first run) but could be intentional scaffolding if subsequent features handle it — however the `feature_list.json` marks all setup features `pass`, so it must be complete.

The security finding (key in query string) is consistent with the Google AI Studio REST API convention, so may be acceptable if that's the required transport; verify against the API docs.

---

VERDICT: FAIL

Blocking issues:
1. `index.ts` first-run branch calls `promptApiKey()` but never persists the key or creates data dir — violates spec step 4. Next boot will re-trigger first-run flow.
