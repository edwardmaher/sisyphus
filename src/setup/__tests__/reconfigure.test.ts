import { runReconfigure } from "../reconfigure";
import { promptApiKey } from "../apiKeyPrompt";
import { writeConfig } from "../configWrite";
import { readConfig } from "../configRead";

jest.mock("../apiKeyPrompt");
jest.mock("../configWrite");
jest.mock("../configRead");

const mockPromptApiKey = promptApiKey as jest.MockedFunction<typeof promptApiKey>;
const mockWriteConfig = writeConfig as jest.MockedFunction<typeof writeConfig>;
const mockReadConfig = readConfig as jest.MockedFunction<typeof readConfig>;

let logSpy: jest.SpyInstance;

describe("runReconfigure", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    mockReadConfig.mockReturnValue({
      gemmaApiKey: "old-key",
      writingDir: "~/Writing",
      firstRun: false,
    });
    mockPromptApiKey.mockResolvedValue("test-key");
    mockWriteConfig.mockReturnValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("prints header before prompt", async () => {
    await runReconfigure();

    expect(logSpy).toHaveBeenNthCalledWith(1, "Reconfiguring Sisyphus...");
  });

  it("calls readConfig, then promptApiKey, then writeConfig with key and existing writingDir", async () => {
    mockPromptApiKey.mockResolvedValue("my-api-key");

    await runReconfigure();

    expect(mockReadConfig).toHaveBeenCalledTimes(1);
    expect(mockPromptApiKey).toHaveBeenCalledTimes(1);
    expect(mockWriteConfig).toHaveBeenCalledWith("my-api-key", "~/Writing");
  });

  it("prints confirmation after success", async () => {
    await runReconfigure();

    expect(logSpy).toHaveBeenLastCalledWith("Configuration updated.");
  });

  it("calls writeConfig after promptApiKey resolves", async () => {
    const order: string[] = [];
    mockPromptApiKey.mockImplementation(async () => {
      order.push("prompt");
      return "key";
    });
    mockWriteConfig.mockImplementation(() => {
      order.push("write");
    });

    await runReconfigure();

    expect(order).toEqual(["prompt", "write"]);
  });
});
