import readline from "readline";

// Mock readline before importing the module under test
jest.mock("readline");

const mockQuestion = jest.fn();
const mockClose = jest.fn();
const mockRlInterface = {
  question: mockQuestion,
  close: mockClose,
};

(readline.createInterface as jest.Mock).mockReturnValue(mockRlInterface);

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock process.exit
const mockExit = jest
  .spyOn(process, "exit")
  .mockImplementation((_code?: string | number | null | undefined) => {
    throw new Error("process.exit called");
  });

// Mock console.error to suppress noise
jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});

// Helper: make question() resolve with given answers in sequence
function mockAnswers(...answers: string[]) {
  let i = 0;
  mockQuestion.mockImplementation(
    (_q: string, cb: (answer: string) => void) => {
      cb(answers[i] ?? "");
      i++;
    }
  );
}

// Helper: make fetch return a given status
function mockFetchStatus(status: number) {
  mockFetch.mockResolvedValue({ status });
}

import { promptApiKey } from "../apiKeyPrompt";

beforeEach(() => {
  jest.clearAllMocks();
  (readline.createInterface as jest.Mock).mockReturnValue(mockRlInterface);
});

describe("promptApiKey", () => {
  it("returns key on first valid attempt", async () => {
    mockAnswers("valid-key-123");
    mockFetchStatus(200);

    const key = await promptApiKey();
    expect(key).toBe("valid-key-123");
    expect(mockClose).toHaveBeenCalled();
  });

  it("retries on invalid key and succeeds on second attempt", async () => {
    mockAnswers("bad-key", "good-key");
    mockFetch
      .mockResolvedValueOnce({ status: 403 })
      .mockResolvedValueOnce({ status: 200 });

    const key = await promptApiKey();
    expect(key).toBe("good-key");
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("exits after 3 failed attempts", async () => {
    mockAnswers("bad1", "bad2", "bad3");
    mockFetchStatus(401);

    await expect(promptApiKey()).rejects.toThrow("process.exit called");
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("exits after 3 empty attempts", async () => {
    mockAnswers("", "", "");
    // fetch never called for empty input
    mockFetchStatus(200);

    await expect(promptApiKey()).rejects.toThrow("process.exit called");
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("exits on network error", async () => {
    mockAnswers("some-key");
    mockFetch.mockRejectedValue(new Error("Connection refused"));

    await expect(promptApiKey()).rejects.toThrow("process.exit called");
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("exits on unexpected API status", async () => {
    mockAnswers("some-key");
    mockFetchStatus(500);

    await expect(promptApiKey()).rejects.toThrow("process.exit called");
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("trims whitespace from key", async () => {
    mockAnswers("  trimmed-key  ");
    mockFetchStatus(200);

    const key = await promptApiKey();
    expect(key).toBe("trimmed-key");
  });
});
