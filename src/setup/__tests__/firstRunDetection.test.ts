import fs from "fs";
import os from "os";

jest.mock("fs");
jest.mock("os");

const mockExistsSync = fs.existsSync as jest.Mock;
const mockHomedir = os.homedir as jest.Mock;

beforeEach(() => {
  mockHomedir.mockReturnValue("/mock/home");
});

import { isFirstRun } from "../firstRunDetection";

describe("isFirstRun", () => {
  it("returns true when config file does not exist", () => {
    mockExistsSync.mockReturnValue(false);
    expect(isFirstRun()).toBe(true);
  });

  it("returns false when config file exists", () => {
    mockExistsSync.mockReturnValue(true);
    expect(isFirstRun()).toBe(false);
  });

  it("checks the correct config path", () => {
    mockExistsSync.mockReturnValue(false);
    isFirstRun();
    expect(mockExistsSync).toHaveBeenCalledWith("/mock/home/.sisyphus/config.json");
  });
});
