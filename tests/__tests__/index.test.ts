import { main } from "../../src/index";
import { isFirstRun } from "../../src/setup/firstRunDetection";
import { promptApiKey } from "../../src/setup/apiKeyPrompt";
import { writeConfig } from "../../src/setup/configWrite";
import { initDataDir } from "../../src/setup/dataDirInit";

jest.mock("../../src/setup/firstRunDetection");
jest.mock("../../src/setup/apiKeyPrompt");
jest.mock("../../src/setup/configWrite");
jest.mock("../../src/setup/dataDirInit");

const mockIsFirstRun = isFirstRun as jest.MockedFunction<typeof isFirstRun>;
const mockPromptApiKey = promptApiKey as jest.MockedFunction<typeof promptApiKey>;
const mockWriteConfig = writeConfig as jest.MockedFunction<typeof writeConfig>;
const mockInitDataDir = initDataDir as jest.MockedFunction<typeof initDataDir>;

beforeEach(() => {
  jest.clearAllMocks();
  mockIsFirstRun.mockReturnValue(false);
  mockPromptApiKey.mockResolvedValue("test-key");
  mockWriteConfig.mockReturnValue(undefined);
  mockInitDataDir.mockReturnValue(undefined);
});

describe("main entry point", () => {
  it("exports main as a function", () => {
    expect(typeof main).toBe("function");
  });

  it("main() returns a Promise", () => {
    const result = main();
    expect(result).toBeInstanceOf(Promise);
    return result;
  });

  it("first-run path calls promptApiKey, writeConfig, initDataDir", async () => {
    mockIsFirstRun.mockReturnValue(true);
    mockPromptApiKey.mockResolvedValue("my-key");

    await main();

    expect(mockPromptApiKey).toHaveBeenCalledTimes(1);
    expect(mockWriteConfig).toHaveBeenCalledWith("my-key");
    expect(mockInitDataDir).toHaveBeenCalledTimes(1);
  });

  it("non-first-run skips promptApiKey and writeConfig", async () => {
    mockIsFirstRun.mockReturnValue(false);

    await main();

    expect(mockPromptApiKey).not.toHaveBeenCalled();
    expect(mockWriteConfig).not.toHaveBeenCalled();
    expect(mockInitDataDir).not.toHaveBeenCalled();
  });
});
