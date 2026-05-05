// import {GetWeatherAPI} from "@controllers";
// import { DayOfWeatherObjects } from "@models";
// import {prisma} from "prisma";

// async function setDatabase() {
// 	const Weatherapi = await GetWeatherAPI(false);
// 	if (typeof Weatherapi[0] == "number") {
// 		return; // move every day in the database one day forward
//     } else {
//         const Weather = Weatherapi as DayOfWeatherObjects[]
//         for(const WeatherDay of Weather)
//             await prisma.earlyerweatherdays.create({
//                 day: WeatherDay.day
//                 data: [WeatherDay.FrontendWeatherObject.map(x => { return [{...x}] })]
//             });
// 		// return Weather; // set this in database
// 	}
// }

// // make setDatabase run 24:00 each day FIX
