import { Router, Request, Response } from "express";
import {
    TodayWeatherForcast,
    NextDaysWeatherForcast,
    WeatherForecastInfo,
} from "@models";
import { MakefetchWithRetry } from "@helpers";

const fetchWithRetry = MakefetchWithRetry("WeatherForecastController");
const router = Router();


router.get("/setDatabade", async (req: Request, res: Response) => {
  // set timeSeries in adminTable
  // set amount of days in adminTable
})