#!/usr/bin/env node

import { isFirstRun } from "./setup/firstRunDetection";
import { promptApiKey } from "./setup/apiKeyPrompt";
import { writeConfig } from "./setup/configWrite";
import { initDataDir } from "./setup/dataDirInit";
import { runReconfigure } from "./setup/reconfigure";

const args = process.argv.slice(2);
const reconfigure = args.includes("--reconfigure");

export async function main(): Promise<void> {
  if (reconfigure) {
    await runReconfigure();
    return;
  }

  if (isFirstRun()) {
    const key = await promptApiKey();
    writeConfig(key);
    initDataDir();
    return;
  }
  // Further boot sequence implemented by other features
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}
