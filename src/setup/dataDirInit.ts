import fs from "fs";
import os from "os";
import path from "path";

export function initDataDir(): void {
  const dataDir = path.join(os.homedir(), ".sisyphus", "data");

  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (err) {
    throw new Error(`Failed to create data directory ${dataDir}: ${err}`);
  }
}
