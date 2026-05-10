import dotenv from "dotenv";
import express from "express";
import * as controller from "@controllers";

dotenv.config({ path: "./.env", override: true, debug: true }); // {path: ../.env}

declare global {
	var test: string;
}
global.test = "test";
console.log("Global.test:  ", global.test)

const app = express();
const PORT = process.env.PORT || 3000;
// const PORT = 3000;

app.use(express.json());

// app.use("/BusTimesController", BusTimesController);
// app.use("/deleteevents", deleteEventsRouter);
// app.use("/getevents", getEventsRouter);
// app.use("/postevents", postEventsRouter);
// app.use("/WeatherForecastController", WeatherForecastController);
app.use("/weather", controller.WeatherController);
app.use("/databade", controller.DatabaseController);
app.use("/departures", controller.BusController);
app.use("/test", controller.test);
app.use("/test2", controller.test2);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});