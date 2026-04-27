import express from "express";
import { BusTimesController, deleteEventsRouter, getEventsRouter, postEventsRouter, WeatherForecastController } from "@controllers"

const app = express();
const port = 3000;

app.use(express.json());

app.use("/BusTimesController", BusTimesController);
app.use("/deleteevents", deleteEventsRouter);
app.use("/getevents", getEventsRouter);
app.use("/postevents", postEventsRouter);
app.use("/WeatherForecastController", WeatherForecastController);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});