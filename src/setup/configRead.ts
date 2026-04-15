import fs from "fs";
import os from "os";
import path from "path";

interface SisyphusConfig {
  gemmaApiKey: string;
  writingDir: string;
  firstRun: boolean;
}

export function readConfig(): SisyphusConfig {
  const configPath = path.join(os.homedir(), ".sisyphus", "config.json");

  let raw: string;
  try {
    raw = fs.readFileSync(configPath, "utf-8");
  } catch (err) {
    throw new Error(`Failed to read config from ${configPath}: ${err}`);
  }

  try {
    return JSON.parse(raw) as SisyphusConfig;
  } catch (err) {
    throw new Error(`Invalid JSON in config file ${configPath}: ${err}`);
  }
}
