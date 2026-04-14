import fs from "fs";
import os from "os";
import path from "path";

export function isFirstRun(): boolean {
  const configPath = path.join(os.homedir(), ".sisyphus", "config.json");
  return !fs.existsSync(configPath);
}
