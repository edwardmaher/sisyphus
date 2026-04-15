export const GEMMA_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent";

export async function validateApiKey(key: string): Promise<boolean> {
  const url = `${GEMMA_API_URL}?key=${encodeURIComponent(key)}`;
  const body = {
    contents: [{ parts: [{ text: "hi" }] }],
  };

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Network error: could not reach Gemma API");
  }

  if (res.status === 200) return true;
  if (res.status === 401 || res.status === 403) return false;
  throw new Error(`Unexpected API response: ${res.status}`);
}
