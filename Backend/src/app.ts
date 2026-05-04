import dotenv from "dotenv";
import express from "express";
import {test, BusTimesController, deleteEventsRouter, getEventsRouter, postEventsRouter, WeatherForecastController, BusController, WeatherController, DatabaseController} from "@controllers";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const PORT = 3000;

app.use(express.json());

// IDK how this works ask martin and group FIX

// app.use("/BusTimesController", BusTimesController);
// app.use("/deleteevents", deleteEventsRouter);
// app.use("/getevents", getEventsRouter);
// app.use("/postevents", postEventsRouter);
// app.use("/WeatherForecastController", WeatherForecastController);
app.use("/weather", WeatherController);
app.use("/databade", DatabaseController);
app.use("/departures", BusController);
app.use("/test", test);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
