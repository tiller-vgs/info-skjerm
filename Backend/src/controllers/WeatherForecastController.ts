import { Router, Request, Response } from "express";
import NodeCache from "node-cache";
import {
    TodayWeatherForcast,
    NextDaysWeatherForcast,
    WeatherForecastInfo, // error is ment to be
} from "@models";
import { MakefetchWithRetry } from "@helpers";

const fetchWithRetry = MakefetchWithRetry("WeatherForecastController");
const router = Router();
const cache = new NodeCache();

const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

router.get("/Today", async (req: Request, res: Response) => {
  const cacheKey = "weather_today";

  const cached = cache.get<TodayWeatherForcast[]>(cacheKey);
  if (cached) {
    console.log("Returning cached weather for today");
    return res.json(cached);
  }

  try {
    const response = await fetchWithRetry(API_URL);
    const json = (await response.json()) as WeatherForecastInfo;
    // const json: WeatherForecastInfo = (await response.json()) as any;

    const timeSeries = json.properties.timeseries;

    const todayList: TodayWeatherForcast[] = [];

    for (let i = 0; i < 7; i++) {
      todayList.push({
        airTemperature: timeSeries[i]!.data.instant.details.air_temperature,
        symbol_code:
          timeSeries[i]!.data.next_1_hours?.summary.symbol_code ?? "",
        time: timeSeries[i]!.time,
      });
    }

    cache.set(cacheKey, todayList, 60 * 10);

    return res.json(todayList);
  } catch (err) {
    console.error("Weather fetch failed", err);
    return res.status(503).send("Weather service unavailable");
  }
});

router.get("/NextDays", async (req: Request, res: Response) => {
  const cacheKey = "weather_nextdays";

  const cached = cache.get<NextDaysWeatherForcast[]>(cacheKey);
  if (cached) {
    console.log("Returning cached weather for next days");
    return res.json(cached);
  }

  try {
    const response = await fetchWithRetry(API_URL);
    const json: WeatherForecastInfo = (await response.json()) as any;

    const timeSeries = json.properties.timeseries;

    const nextDays: NextDaysWeatherForcast[] = [];
    const noon = 12;
    let dayIndex = 1;

    for (const ts of timeSeries) {
      if (dayIndex === 8) break;

      const hour = parseInt(ts.time.substring(11, 13));

      if (hour !== noon) continue;

      nextDays.push({
        airTemperature: ts.data.instant.details.air_temperature,
        symbol_code: ts.data.next_6_hours?.summary.symbol_code ?? "",
        time: ts.time,
      });

      dayIndex++;
    }

    cache.set(cacheKey, nextDays, 60 * 30);

    return res.json(nextDays);
  } catch (err) {
    console.error("Weather fetch failed", err);
    return res.status(503).send("Weather service unavailable");
  }
});

export default router;
