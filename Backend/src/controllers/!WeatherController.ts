import { Router, Request, Response } from "express";
import {
  TodayWeatherForcast,
  NextDaysWeatherForcast,
  WeatherForecastInfo,
} from "@models";
import { MakefetchWithRetry } from "@helpers";
import { EntireWeather } from "models/WeatherInputObjects";
import { WeatherDay, FrontendWeatherObject } from "models/WeatherOutputObjects copy";

const fetchWithRetry = MakefetchWithRetry("WeatherForecastController");
const router = Router();

const API_URL =
  "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

router.get("/getWeather", async (req: Request, res: Response) => {
  // check database for time sets and day amount
  const DayAmount = 4;
  const TimeSets = ["06:45-08:45", "11:00-12:00", "13:35-15:20", "15:20-17:00"];
  const TimeSetsHoures = TimeSets.map((t) =>
    t.split("-").map((x) => x.slice(0, 2)),
  );
  const AllDays: WeatherDay[] = [];

  const response = await fetchWithRetry(API_URL);
  const json = (await response.json()) as EntireWeather;
  const Timeseries = json.properties.timeseries;

  const TimeSetData = {
    witchTimeSetOn: 0,
    isInTimeSet: false,
    WeatherObject: <FrontendWeatherObject>{},
  };

  const FakeWeatherObject: FrontendWeatherObject = {
    time: "",
    symbol_code: "",
    air_temperature: 0,
    wind_speed: 0,
    wind_from_direction: 0,
  };


  for (let index = 0; index < DayAmount; index++) {
    const WeatherObjectTimeSetsList: FrontendWeatherObject[][] = Array.from({ length: TimeSets.length }, () => [])
    
    for (const Timeserie of Timeseries) {
      const time = Timeserie.time.split("T")[1]!.split("Z")[0]!;
      const Data = Timeserie.data;
      const symbol_code = Data.next_1_hours.summary.symbol_code;
      const WeatherData = Data.instant.details;


      const Hour = Number(time.slice(0, 2));
      const TimeSetIndex = TimeSetsHoures.findIndex(
        (TimeSet) => Hour >= Number(TimeSet[0]) && Hour <= Number(TimeSet[1]),
      );

      const WeatherObject: FrontendWeatherObject = {
        time: TimeSets[TimeSetIndex]!,
        symbol_code,
        air_temperature: WeatherData.air_temperature,
        wind_speed: WeatherData.wind_speed,
        wind_from_direction: WeatherData.wind_from_direction,
      };

      if (TimeSetIndex != -1) {
        WeatherObjectTimeSetsList[TimeSetIndex]!.push(WeatherObject);
      }
    }

    const FrontendWeatherObjectList: FrontendWeatherObject[] = [];
    for (const WeatherObjectList of WeatherObjectTimeSetsList) {
      let FrontendWeatherObject: FrontendWeatherObject;
      let madeWeatherObject: Boolean = false
      for (const WeatherObject of WeatherObjectList) {
        if (!madeWeatherObject) {
          FrontendWeatherObject = WeatherObject;
          madeWeatherObject = true;
        } else {
          FrontendWeatherObject!.symbol_code += "|" + WeatherObject.symbol_code;
          FrontendWeatherObject!.air_temperature += WeatherObject.air_temperature;
          FrontendWeatherObject!.wind_speed += WeatherObject.wind_speed;
          FrontendWeatherObject!.wind_from_direction += WeatherObject.wind_from_direction;
        };
      }
      FrontendWeatherObject!.air_temperature /= WeatherObjectList.length;
      FrontendWeatherObject!.wind_speed /= WeatherObjectList.length;
      FrontendWeatherObject!.wind_from_direction /= WeatherObjectList.length;
      FrontendWeatherObjectList.push(FrontendWeatherObject!);
    }

    AllDays.push({ day: "", FrontendWeatherObject: FrontendWeatherObjectList });
  }
});
