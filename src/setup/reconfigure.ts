import { promptApiKey } from "./apiKeyPrompt";
import { writeConfig } from "./configWrite";

export async function runReconfigure(): Promise<void> {
  console.log("Reconfiguring Sisyphus...");
  const key = await promptApiKey();
  writeConfig(key);
  console.log("Configuration updated.");
}
