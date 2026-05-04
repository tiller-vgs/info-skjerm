// type listefy makes an object, an object where each property becomes a list with the origanrl property in it

import {Router, Request, Response} from "express";
import { GetWeatherAPI } from "./!WeatherController2";


const router = Router();

router.get("/", async (req: Request, res: Response) => {
  return await GetWeatherAPI(req, res, false);
});

export default router;