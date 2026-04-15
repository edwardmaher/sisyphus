import { writeConfig } from "../configWrite";
import fs from "fs";
import os from "os";
import path from "path";

jest.mock("fs");
jest.mock("os");

const mockFs = fs as jest.Mocked<typeof fs>;
const mockOs = os as jest.Mocked<typeof os>;

describe("writeConfig", () => {
  const fakeHome = "/fake/home";
  const sisyphusDir = path.join(fakeHome, ".sisyphus");
  const configPath = path.join(sisyphusDir, "config.json");

  beforeEach(() => {
    jest.clearAllMocks();
    mockOs.homedir.mockReturnValue(fakeHome);
  });

  it("creates config directory if absent", () => {
    mockFs.mkdirSync.mockReturnValue(undefined);
    mockFs.writeFileSync.mockReturnValue(undefined);

    writeConfig("test-key");

    expect(mockFs.mkdirSync).toHaveBeenCalledWith(sisyphusDir, {
      recursive: true,
    });
  });

  it("writes correct JSON with provided key, default writingDir, firstRun false", () => {
    mockFs.mkdirSync.mockReturnValue(undefined);
    mockFs.writeFileSync.mockReturnValue(undefined);

    writeConfig("my-api-key");

    const expectedJson = JSON.stringify(
      { gemmaApiKey: "my-api-key", writingDir: "~/Documents", firstRun: false },
      null,
      2
    );
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      configPath,
      expectedJson,
      "utf-8"
    );
  });

  it("throws on mkdirSync failure", () => {
    mockFs.mkdirSync.mockImplementation(() => {
      throw new Error("permission denied");
    });

    expect(() => writeConfig("key")).toThrow(
      `Failed to create config directory ${sisyphusDir}`
    );
  });

  it("throws on writeFileSync failure", () => {
    mockFs.mkdirSync.mockReturnValue(undefined);
    mockFs.writeFileSync.mockImplementation(() => {
      throw new Error("disk full");
    });

    expect(() => writeConfig("key")).toThrow(
      `Failed to write config to ${configPath}`
    );
  });
});
