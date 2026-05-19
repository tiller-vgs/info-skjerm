import { Router, Request, Response } from "express";
import { EntireWeather, DayOfWeatherObjects, FrontendWeatherObject, HelperWeatherObject, Listify, Businfo } from "@models";
import { MakefetchWithRetry, print } from "@helpers";
import { GetWeatherAPI } from "@controllers";

const router = Router();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = days[new Date("2024-05-28").getDay()];

const myenv = process.env.DATABASE_URL;
router.get("/", async (req: Request, res: Response) => {
	let response: any;
	const Weatherapi = await GetWeatherAPI();
	// if (typeof Weatherapi[0] == "number") {
	//     return res.status(Weatherapi[0]!).send(Weatherapi[1]!); // move every day in the database one day forward
	// }
	// const Weather = Weatherapi as DayOfWeatherObjects[];
	// const DatabaseOptions: RequestInit = {
	// 	method: "put",
	// 	headers: { "Content-Type": "application/json", Authorization: "Bearer token" },
	// 	body: JSON.stringify({ WhatToChange: "dayamount", WhatToChangeTo: "5" }),
	// };


	// print(DatabaseOptions, "http://localhost:3001/DatabaseController", DatabaseOptions);
	// response = await fetch("http://localhost:3001/DatabaseController", DatabaseOptions);
	// const DatabaseController = (await response.json());

	// const BusStop = "Tiller vgs."
	// response = await fetch(`http://localhost:3001/busdepartures?BusStop=${BusStop.replace(" ", "%20")}`);
	// const BussAPI = (await response.json()) as Businfo;
	return res.json([
		// [Weather.map(x => {return x.FrontendWeatherObject.map(x => { return [{...x}] })})],
		Weatherapi,
		// DatabaseController,
		// BussAPI,
		dayName,
		process.env.DATABASE_URL + "  ||  " + myenv + "  ||  " + process.env.test + "  ||  " + process.env.PORT + "  ||  " + process.env,
	]);
});

export default router;

