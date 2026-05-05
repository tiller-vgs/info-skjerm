export function MakefetchWithRetry(fetchingWhat: string = "generell info") {
  return async (url: string, options: any = undefined): Promise<globalThis.Response> => {
    const allowedAttempts: number = 2;
    for (let attempt = 0; attempt < allowedAttempts; attempt++) {
      try {
        console.log(`Fetching ${fetchingWhat} (attempt ${attempt + 1})`);

        let response;
        if (options) {
          response = await fetch(url, options);
        } else {
          response = await fetch(url);
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response;
      } catch (err) {
        console.error(`Error on attempt ${attempt + 1}`, err);

        //   if (attempt === allowedAttempts - 1) throw err;

        await new Promise((res) => setTimeout(res, 500));
      };
    };
    throw new Error("Unreachable");
  };
};
import { Listify } from "@models"
export function makeEmptyListified<T>(obj: T): Listify<T> {
  const result = {} as Listify<T>;
  for (const key in obj) {
		result[key] = [];
	}
  return result;
}