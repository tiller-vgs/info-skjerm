import { Router, Request, Response } from "express";
import { EntireWeather, DayOfWeatherObjects, FrontendWeatherObject, HelperWeatherObject, Listify } from "@models";
import { MakefetchWithRetry } from "@helpers";
import {GetWeatherAPI} from "@controllers";
const router = Router();

// const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const dayName = days[new Date("2024-05-28").getDay()];



router.get("/", async (req: Request, res: Response) => {
    return res.json(["hello"])
});


export default router;
