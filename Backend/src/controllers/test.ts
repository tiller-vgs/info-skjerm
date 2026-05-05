import { Router, Request, Response } from "express";
import { EntireWeather, DayOfWeatherObjects, FrontendWeatherObject, HelperWeatherObject, Listify } from "@models";
import { MakefetchWithRetry } from "@helpers";
import {GetWeatherAPI} from "@controllers";

const router = Router();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = days[new Date("2024-05-28").getDay()];


const myenv = process.env.DATABASE_URL;
router.get("/", async (req: Request, res: Response) => {
    const Weatherapi = await GetWeatherAPI(false);
    if (typeof Weatherapi[0] == "number") {
        return res.status(Weatherapi[0]!).send(Weatherapi[1]!); // move every day in the database one day forward
    }
    const Weather = Weatherapi as DayOfWeatherObjects[];
    return res.json([
			// [Weather.map(x => {return x.FrontendWeatherObject.map(x => { return [{...x}] })})],
            Weatherapi,
            dayName,
			process.env.DATABASE_URL + "  ||  " + myenv + "  ||  " + process.env.test + "  ||  " + process.env.PORT + "  ||  " + process.env,
		]);
});


export default router;
