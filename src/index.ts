#!/usr/bin/env node

import { isFirstRun } from "./setup/firstRunDetection";
import { promptApiKey } from "./setup/apiKeyPrompt";

const args = process.argv.slice(2);
const reconfigure = args.includes("--reconfigure");

export async function main(): Promise<void> {
  if (reconfigure) {
    // setup/reconfigure-flag feature will implement this
    console.log("Reconfiguration not yet implemented.");
    return;
  }

  if (isFirstRun()) {
    await promptApiKey();
    return;
  }
  // Further boot sequence implemented by other features
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
