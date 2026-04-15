import { initDataDir } from "../dataDirInit";
import fs from "fs";
import os from "os";
import path from "path";

jest.mock("fs");
jest.mock("os");

const mockFs = fs as jest.Mocked<typeof fs>;
const mockOs = os as jest.Mocked<typeof os>;

describe("initDataDir", () => {
  const fakeHome = "/fake/home";
  const dataDir = path.join(fakeHome, ".sisyphus", "data");

  beforeEach(() => {
    jest.clearAllMocks();
    mockOs.homedir.mockReturnValue(fakeHome);
  });

  it("creates data dir when absent", () => {
    mockFs.mkdirSync.mockReturnValue(undefined);

    initDataDir();

    expect(mockFs.mkdirSync).toHaveBeenCalledWith(dataDir, { recursive: true });
  });

  it("no throw when dir already exists (recursive is idempotent)", () => {
    mockFs.mkdirSync.mockReturnValue(undefined);

    expect(() => initDataDir()).not.toThrow();
  });

  it("throws Error with path info when mkdirSync throws", () => {
    mockFs.mkdirSync.mockImplementation(() => {
      throw new Error("permission denied");
    });

    expect(() => initDataDir()).toThrow(
      `Failed to create data directory ${dataDir}`
    );
  });
});
