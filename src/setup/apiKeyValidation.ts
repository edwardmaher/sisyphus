export const GEMMA_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemma-4-27b-it:generateContent";

export async function validateApiKey(key: string): Promise<boolean> {
  const body = {
    contents: [{ parts: [{ text: "hi" }] }],
  };

  let res: Response;
  try {
    res = await fetch(GEMMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Network error: could not reach Gemma API");
  }

  if (res.status === 200) return true;
  if (res.status === 401 || res.status === 403) return false;
  throw new Error(`Unexpected API response: ${res.status}`);
}
