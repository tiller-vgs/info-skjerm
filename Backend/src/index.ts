import express from "express";
import {BusTimesController, deleteEventsRouter, getEventsRouter, postEventsRouter, WeatherForecastController, BusController, WeatherController, DatabaseController} from "@controllers";

const app = express();
const port = 3000;

app.use(express.json());

// IDK how this works ask martin and group FIX

// app.use("/BusTimesController", BusTimesController);
// app.use("/deleteevents", deleteEventsRouter);
// app.use("/getevents", getEventsRouter);
// app.use("/postevents", postEventsRouter);
// app.use("/WeatherForecastController", WeatherForecastController);
app.use(WeatherController);
app.use(DatabaseController);
app.use(BusController);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});