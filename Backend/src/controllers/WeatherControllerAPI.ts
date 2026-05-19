// type listefy makes an object, an object where each property becomes a list with the origanrl property in it

import {Router, Request, Response} from "express";
import {GetWeatherAPI} from "@controllers";


const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const Weather = await GetWeatherAPI(false);
  if (typeof Weather[0] == "number") {
		return res.status(Weather[0]!).send(Weather[1]!);
  } else {
    return res.json(Weather);
  }
});

export default router;