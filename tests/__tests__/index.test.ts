import { main } from "../../src/index";

jest.mock("../../src/setup/firstRunDetection", () => ({
  isFirstRun: jest.fn().mockReturnValue(false),
}));

jest.mock("../../src/setup/apiKeyPrompt", () => ({
  promptApiKey: jest.fn().mockResolvedValue("test-key"),
}));

describe("main entry point", () => {
  it("exports main as a function", () => {
    expect(typeof main).toBe("function");
  });

  it("main() returns a Promise", () => {
    const result = main();
    expect(result).toBeInstanceOf(Promise);
    return result;
  });
});
