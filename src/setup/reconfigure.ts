import { promptApiKey } from "./apiKeyPrompt";
import { writeConfig } from "./configWrite";
import { readConfig } from "./configRead";

export async function runReconfigure(): Promise<void> {
  console.log("Reconfiguring Sisyphus...");
  const existing = readConfig();
  const key = await promptApiKey();
  writeConfig(key, existing.writingDir);
  console.log("Configuration updated.");
}
