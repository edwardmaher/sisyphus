import readline from "readline";

const GEMMA_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent";
const MAX_ATTEMPTS = 3;

async function validateApiKey(key: string): Promise<boolean> {
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

function prompt(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

export async function promptApiKey(): Promise<string> {
  console.log(
    "Sisyphus uses Gemma 4 via Google AI Studio. Get a free API key at https://aistudio.google.com/"
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const key = (await prompt(rl, "Enter your Gemma API key: ")).trim();

      if (!key) {
        console.error("API key cannot be empty.");
        continue;
      }

      let valid: boolean;
      try {
        valid = await validateApiKey(key);
      } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
        process.exit(1);
      }

      if (valid) {
        return key;
      }

      const remaining = MAX_ATTEMPTS - attempt;
      if (remaining > 0) {
        console.error(
          `Invalid API key. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
        );
      }
    }
  } finally {
    rl.close();
  }

  console.error(
    `Failed to validate API key after ${MAX_ATTEMPTS} attempts.\nGet a key at https://aistudio.google.com/`
  );
  process.exit(1);
}
