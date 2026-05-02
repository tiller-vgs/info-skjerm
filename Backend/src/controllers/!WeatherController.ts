// type listefy makes an object, an object where each property becomes a list with the origanrl property in it

import {Router, Request, Response} from "express";
import {EntireWeather, DayOfWeatherObjects, FrontendWeatherObject, HelperWeatherObject, Listify} from "@models";
import {MakefetchWithRetry} from "@helpers";

const fetchWithRetry = MakefetchWithRetry("WeatherForecastController");
const router = Router();

const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

router.get("/getWeather", async (req: Request, res: Response) => {
  // check database for time sets and day amount
  const DayAmount = 4;
  const TimeSets = ["06:45-08:45", "11:00-12:00", "13:35-15:20", "15:20-17:00"];
  const TimeSetsHoures = TimeSets.map((t) => t.split("-").map((x) => x.slice(0, 2)));
  let StartDate: string = req.body || "none";

  const response = await fetchWithRetry(API_URL);
  const json = (await response.json()) as EntireWeather;
  const Timeseries = json.properties.timeseries;

  let FirstDay: string = "";
  let SavedDay: string = "";
  let SavedTimeSetIndex: number = -1;

  const ListsOfWeatherObjectAllDays: Listify<HelperWeatherObject>[][] = [];
  const ListsOfWeatherObjectInTimeSet: Listify<HelperWeatherObject>[] = <any>{};
  const ListsOfWeatherObject: Listify<HelperWeatherObject> = <any>{};

  // Timeserie is where all the the information for one hour is
  for (const Timeserie of Timeseries) {
    const FullDate = Timeserie.time.split("T")[0]!;
    const Date = FullDate.slice(5, FullDate.length);
    const FullTime = Timeserie.time.split("T")[1]!.split("Z")[0]!;
    const time = FullTime.slice(FullTime.length - 3, FullTime.length);
    const WeatherData = Timeserie.data.instant.details;

    // see if the date is after StartDate if not dont run any code under this
    if (FirstDay === "") {
      if (StartDate !== "none") {
        if (Number(StartDate.split("-")[0]!) * 30 + Number(StartDate.split("-")[1]!) > Number(Date.split("-")[0]!) * 30 + Number(Date.split("-")[1]!)) continue;
      }
      FirstDay = Date;
    }
    // see if the date have changed if so add list of current day to the list with all days
    if (SavedDay !== Date) {
      if (SavedDay !== "") {
        if (SavedTimeSetIndex !== -1) {
          ListsOfWeatherObjectInTimeSet.push({...ListsOfWeatherObject});
          SavedTimeSetIndex = -1;
        }
        ListsOfWeatherObjectAllDays.push([...ListsOfWeatherObjectInTimeSet]);
      }
      ListsOfWeatherObjectInTimeSet.length = 0;
      SavedDay = Date;
    }
    // see if the current date is more than the DayAmount allows
    if (Number(FirstDay.split("-")[0]!) * 30 + Number(FirstDay.split("-")[1]!) + DayAmount <= Number(Date.split("-")[0]!) * 30 + Number(Date.split("-")[1]!)) {
      break;
    }

    // get the index for with part of TimeSets this Timeserie is
    const Hour = Number(time.slice(0, 2));
    const TimeSetIndex = TimeSetsHoures.findIndex((TimeSet) => Hour >= Number(TimeSet[0]) && Hour <= Number(TimeSet[1]));

    // if the current Timeserie is not in the same TimeSet as the last if so add list with current Timeset to the list for current day
    if (SavedTimeSetIndex !== TimeSetIndex) {
      if (SavedTimeSetIndex !== -1) {
        ListsOfWeatherObjectInTimeSet.push({...ListsOfWeatherObject});
      }
      Object.keys(ListsOfWeatherObject).forEach((key) => delete ListsOfWeatherObject[key as keyof typeof ListsOfWeatherObject]); // try to change the line under to this FIX // aks witch is best
      // ListsOfWeatherObject = <any>{};
      SavedTimeSetIndex = TimeSetIndex;
    }

    if (TimeSetIndex != -1) {
      ListsOfWeatherObject.time.push(time);
      ListsOfWeatherObject.date.push(Date);
      ListsOfWeatherObject.symbol_code.push(Timeserie.data.next_1_hours.summary.symbol_code);
      ListsOfWeatherObject.air_temperature.push(WeatherData.air_temperature);
      ListsOfWeatherObject.wind_speed.push(WeatherData.wind_speed);
      ListsOfWeatherObject.wind_from_direction.push(WeatherData.wind_from_direction);
    }
  }

  // avrage the values for each timeset and put it in the right format
  const ListOfDayOfWeatherObjects: DayOfWeatherObjects[] = <any>[];
  for (const ListsOfWeatherObjectInTimeSet of ListsOfWeatherObjectAllDays) {
    const DayOfWeatherObjects: DayOfWeatherObjects = <any>{day: ListsOfWeatherObjectInTimeSet[0]!.date};
    const ListOfFrontendWeatherObject: FrontendWeatherObject[] = <any>[];

    for (const ListOfWeatherObject of ListsOfWeatherObjectInTimeSet) {
      const FrontendWeatherObject: FrontendWeatherObject = <any>{};

      FrontendWeatherObject.time = ListOfWeatherObject.time[0]! + "-" + ListOfWeatherObject.time[ListOfWeatherObject.time.length - 1]!;
      FrontendWeatherObject.symbol_code = ListOfWeatherObject.symbol_code[0]!; // NEEDS FIXING // ask martin how he want theise to be shown
      FrontendWeatherObject.air_temperature = ListOfWeatherObject.air_temperature.reduce((a, b) => a + b, 0) / ListOfWeatherObject.air_temperature.length;
      FrontendWeatherObject.wind_speed = ListOfWeatherObject.wind_speed.reduce((a, b) => a + b, 0) / ListOfWeatherObject.air_temperature.length;
      FrontendWeatherObject.wind_from_direction = ListOfWeatherObject.wind_from_direction.reduce((a, b) => a + b, 0) / ListOfWeatherObject.wind_from_direction.length;

      ListOfFrontendWeatherObject.push({...FrontendWeatherObject});
    }
    DayOfWeatherObjects.FrontendWeatherObject = [...ListOfFrontendWeatherObject];
    ListOfDayOfWeatherObjects.push({...DayOfWeatherObjects});
  }

  return res.json(ListOfDayOfWeatherObjects);

  // keep code i think i need this later

  //   const FrontendWeatherObjectList: FrontendWeatherObject[] = [];
  //   for (const WeatherObjectList of WeatherObjectTimeSetsList) {
  //     let FrontendWeatherObject: FrontendWeatherObject;
  //     let madeWeatherObject: Boolean = false;
  //     for (const WeatherObject of WeatherObjectList) {
  //       if (!madeWeatherObject) {
  //         FrontendWeatherObject = WeatherObject;
  //         madeWeatherObject = true;
  //       } else {
  //         FrontendWeatherObject!.symbol_code += "|" + WeatherObject.symbol_code;
  //         FrontendWeatherObject!.air_temperature += WeatherObject.air_temperature;
  //         FrontendWeatherObject!.wind_speed += WeatherObject.wind_speed;
  //         FrontendWeatherObject!.wind_from_direction += WeatherObject.wind_from_direction;
  //       }
  //     }
  //     FrontendWeatherObject!.air_temperature /= WeatherObjectList.length;
  //     FrontendWeatherObject!.wind_speed /= WeatherObjectList.length;
  //     FrontendWeatherObject!.wind_from_direction /= WeatherObjectList.length;
  //     FrontendWeatherObjectList.push(FrontendWeatherObject!);
  //   }

  //   AllDays.push({day: "", FrontendWeatherObject: FrontendWeatherObjectList});
  // }
});

export default router;
