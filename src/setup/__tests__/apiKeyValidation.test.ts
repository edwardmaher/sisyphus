import { validateApiKey, GEMMA_API_URL } from "../apiKeyValidation";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("validateApiKey", () => {
  it("returns true on HTTP 200", async () => {
    mockFetch.mockResolvedValue({ status: 200 });
    await expect(validateApiKey("valid-key")).resolves.toBe(true);
  });

  it("returns false on HTTP 401", async () => {
    mockFetch.mockResolvedValue({ status: 401 });
    await expect(validateApiKey("bad-key")).resolves.toBe(false);
  });

  it("returns false on HTTP 403", async () => {
    mockFetch.mockResolvedValue({ status: 403 });
    await expect(validateApiKey("bad-key")).resolves.toBe(false);
  });

  it("throws with 'Network error' on fetch rejection", async () => {
    mockFetch.mockRejectedValue(new Error("ECONNREFUSED"));
    await expect(validateApiKey("any-key")).rejects.toThrow("Network error");
  });

  it("throws with status code on unexpected status", async () => {
    mockFetch.mockResolvedValue({ status: 500 });
    await expect(validateApiKey("any-key")).rejects.toThrow(
      "Unexpected API response: 500"
    );
  });

  it("URL includes encoded API key as query param", async () => {
    mockFetch.mockResolvedValue({ status: 200 });
    const key = "my key&special=chars";
    await validateApiKey(key);
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toBe(`${GEMMA_API_URL}?key=${encodeURIComponent(key)}`);
  });
});
