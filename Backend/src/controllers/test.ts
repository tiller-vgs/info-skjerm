import { Router, Request, Response } from "express";
import { EntireWeather, DayOfWeatherObjects, FrontendWeatherObject, HelperWeatherObject, Listify } from "@models";
import { MakefetchWithRetry } from "@helpers";
import {AllValues} from "@controllers";

const router = Router();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = days[new Date("2024-05-28").getDay()];


const myenv = process.env.DATABASE_URL;
router.get("/", async (req: Request, res: Response) => {
    return res.json([
        dayName, 
        process.env.DATABASE_URL + "  ||  " + myenv + "  ||  " + process.env.test + "  ||  " + process.env.PORT + "  ||  " + process.env,
    ]);
});


export default router;
