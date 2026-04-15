import { runReconfigure } from "../reconfigure";
import { promptApiKey } from "../apiKeyPrompt";
import { writeConfig } from "../configWrite";

jest.mock("../apiKeyPrompt");
jest.mock("../configWrite");

const mockPromptApiKey = promptApiKey as jest.MockedFunction<typeof promptApiKey>;
const mockWriteConfig = writeConfig as jest.MockedFunction<typeof writeConfig>;

describe("runReconfigure", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("prints header before prompt", async () => {
    mockPromptApiKey.mockResolvedValue("test-key");
    mockWriteConfig.mockReturnValue(undefined);

    const logSpy = jest.spyOn(console, "log");
    await runReconfigure();

    expect(logSpy).toHaveBeenNthCalledWith(1, "Reconfiguring Sisyphus...");
  });

  it("calls promptApiKey then writeConfig with returned key", async () => {
    mockPromptApiKey.mockResolvedValue("my-api-key");
    mockWriteConfig.mockReturnValue(undefined);

    await runReconfigure();

    expect(mockPromptApiKey).toHaveBeenCalledTimes(1);
    expect(mockWriteConfig).toHaveBeenCalledWith("my-api-key");
  });

  it("prints confirmation after success", async () => {
    mockPromptApiKey.mockResolvedValue("test-key");
    mockWriteConfig.mockReturnValue(undefined);

    const logSpy = jest.spyOn(console, "log");
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
