import { readConfig } from "../configRead";
import fs from "fs";
import os from "os";
import path from "path";

jest.mock("fs");
jest.mock("os");

const mockFs = fs as jest.Mocked<typeof fs>;
const mockOs = os as jest.Mocked<typeof os>;

describe("readConfig", () => {
  const fakeHome = "/fake/home";
  const configPath = path.join(fakeHome, ".sisyphus", "config.json");

  beforeEach(() => {
    jest.clearAllMocks();
    mockOs.homedir.mockReturnValue(fakeHome);
  });

  it("returns parsed config when file valid", () => {
    const config = { gemmaApiKey: "my-key", writingDir: "~/Documents", firstRun: false };
    mockFs.readFileSync.mockReturnValue(JSON.stringify(config));

    expect(readConfig()).toEqual(config);
  });

  it("throws on missing file", () => {
    const err = Object.assign(new Error("no such file"), { code: "ENOENT" });
    mockFs.readFileSync.mockImplementation(() => { throw err; });

    expect(() => readConfig()).toThrow(`Failed to read config from ${configPath}`);
  });

  it("throws on invalid JSON", () => {
    mockFs.readFileSync.mockReturnValue("not-json{{{");

    expect(() => readConfig()).toThrow(`Invalid JSON in config file ${configPath}`);
  });

  it("reads from correct path", () => {
    const config = { gemmaApiKey: "k", writingDir: "~/Documents", firstRun: false };
    mockFs.readFileSync.mockReturnValue(JSON.stringify(config));

    readConfig();

    expect(mockFs.readFileSync).toHaveBeenCalledWith(configPath, "utf-8");
  });
});
