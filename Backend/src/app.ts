import dotenv from "dotenv";
import express from "express";
import {test, test2, BusTimesController, deleteEventsRouter, getEventsRouter, postEventsRouter, WeatherForecastController, BusController, WeatherController, DatabaseController} from "@controllers";

dotenv.config(); // {path: ../.env}

declare global {
	var test: string;
}
global.test = "test";
console.log("Globel.test:  ", global.test)

const app = express();
const PORT = process.env.PORT || 3000;
// const PORT = 3000;

app.use(express.json());

// app.use("/BusTimesController", BusTimesController);
// app.use("/deleteevents", deleteEventsRouter);
// app.use("/getevents", getEventsRouter);
// app.use("/postevents", postEventsRouter);
// app.use("/WeatherForecastController", WeatherForecastController);
app.use("/weather", WeatherController);
app.use("/databade", DatabaseController);
app.use("/departures", BusController);
app.use("/test", test);
app.use("/test2", test2);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
