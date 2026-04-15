import readline from "readline";
import { validateApiKey } from "./apiKeyValidation";

const MAX_ATTEMPTS = 3;

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
