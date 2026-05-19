// type listefy makes an object, an object where each property becomes a list with the origanrl property in it

import {Router, Request, Response} from "express";
import {GetWeatherAPI} from "@controllers";
import { DayOfWeatherObjects } from "@models";


const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
		// Get GetWeatherAPI and input based on the url used to reach this router
		let Weather: (string | number)[] | DayOfWeatherObjects[] = [503, "Get Weather router unavailable"];
		try {
			const DayAmount = Number(req.query.DayAmount);
			Weather = await GetWeatherAPI(DayAmount);
		} catch {
			Weather = await GetWeatherAPI();
		}

		// If GetWeatherAPI returns an error
		if (typeof Weather[0] == "number") {
			return res.status(Weather[0]!).send(Weather[1]!);
		} else {
			return res.json(Weather);
		}
	} catch {
    return res.status(503).send("Get Weather router unavailable");
  }
});

export default router;