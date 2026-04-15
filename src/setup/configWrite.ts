import fs from "fs";
import os from "os";
import path from "path";

interface SisyphusConfig {
  gemmaApiKey: string;
  writingDir: string;
  firstRun: boolean;
}

export function writeConfig(gemmaApiKey: string): void {
  const sisyphusDir = path.join(os.homedir(), ".sisyphus");
  const configPath = path.join(sisyphusDir, "config.json");

  try {
    fs.mkdirSync(sisyphusDir, { recursive: true });
  } catch (err) {
    throw new Error(`Failed to create config directory ${sisyphusDir}: ${err}`);
  }

  const config: SisyphusConfig = {
    gemmaApiKey,
    writingDir: "~/Documents",
    firstRun: false,
  };

  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
  } catch (err) {
    throw new Error(`Failed to write config to ${configPath}: ${err}`);
  }
}
