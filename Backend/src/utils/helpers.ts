export async function fetchWithRetry(
    url: string,
    fetchingWhat: string = "generell info",
    allowedAttempts: number = 2,
): Promise<globalThis.Response> {
  for (let attempt = 0; attempt < allowedAttempts; attempt++) {
    try {
      console.log(`Fetching ${fetchingWhat} (attempt ${attempt + 1})`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (err) {
      console.error(`Error on attempt ${attempt + 1}`, err);

      //   if (attempt === allowedAttempts - 1) throw err;

      await new Promise((res) => setTimeout(res, 500));
    }
  }

  throw new Error("Unreachable");
}
