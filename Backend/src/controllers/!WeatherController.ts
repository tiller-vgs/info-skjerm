import {Router, Request, Response} from "express";
import {TodayWeatherForcast, NextDaysWeatherForcast, WeatherForecastInfo} from "@models";
import {MakefetchWithRetry} from "@helpers";
import {EntireWeather} from "models/WeatherInputObjects";
import {DayOfWeatherObjects, FrontendWeatherObject} from "models/WeatherOutputObjects copy";

const fetchWithRetry = MakefetchWithRetry("WeatherForecastController");
const router = Router();

const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

router.get("/getWeather", async (req: Request, res: Response) => {
  // check database for time sets and day amount
  const DayAmount = 4;
  const TimeSets = ["06:45-08:45", "11:00-12:00", "13:35-15:20", "15:20-17:00"];
  const TimeSetsHoures = TimeSets.map((t) => t.split("-").map((x) => x.slice(0, 2)));
  let StartDay: string = req.body || "none";
  const AllDays: DayOfWeatherObjects[] = [];

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

  interface HelperWeatherObject {
    time: string;
    date: string;
    TimeSetIndex: number;
    symbol_code: string;
    air_temperature: number;
    wind_speed: number;
    wind_from_direction: number;
  }

  // list of lists with each element in WeatherObject

  type Listify<T> = {[K in keyof T]: T[K][]};
  function makeEmptyListified<T extends Record<string, any>>(): Listify<T> {
    const result: any = {};
    return result;
  }

  // const ListOfListsOfWeatherObjectElements = Array.from(
  //   { length: Object.keys(FakeWeatherObject).length },
  //   () => [],
  // );
  const ListForEachTimeSet = Array.from({length: TimeSets.length}, () => []);

  const WeatherObjectTimeSetsList: FrontendWeatherObject[][] = Array.from({length: TimeSets.length}, () => []);

  let FirstDay: string = "";
  let SavedDay: string = "";
  let SavedTimeSetIndex: number = -1;

  const ListsOfWeatherObjectAllDays: Listify<HelperWeatherObject>[][] = [];
  // const ListsOfWeatherObjectInTimeSet: {TimeSet: string; ListsOfWeatherObject: Listify<FrontendWeatherObject>}[] = <any>{};
  const ListsOfWeatherObjectInTimeSet: Listify<HelperWeatherObject>[] = <any>{};
  let ListsOfWeatherObject = makeEmptyListified<HelperWeatherObject>();

  // Timeserie is where all the the information for one hour is
  for (const Timeserie of Timeseries) {
    const FullDate = Timeserie.time.split("T")[0]!;
    const Date = FullDate.slice(5, FullDate.length);
    const FullTime = Timeserie.time.split("T")[1]!.split("Z")[0]!;
    const time = FullTime.slice(FullTime.length - 3, FullTime.length)
    const WeatherData = Timeserie.data.instant.details;

    // se if the data have changed
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
    // se if the amount of days is more then needed
    if (FirstDay === "") {
      if (StartDay !== "none") {
        if (Number(StartDay.split("-")[0]!) * 30 + Number(StartDay.split("-")[1]!) > Number(Date.split("-")[0]!) * 30 + Number(Date.split("-")[1]!)) continue;
      }
      FirstDay = Date;
    }
    if (Number(FirstDay.split("-")[0]!) * 30 + Number(FirstDay.split("-")[1]!) + DayAmount <= Number(Date.split("-")[0]!) * 30 + Number(Date.split("-")[1]!)) {
      break;
    }

    const Hour = Number(time.slice(0, 2));
    const TimeSetIndex = TimeSetsHoures.findIndex((TimeSet) => Hour >= Number(TimeSet[0]) && Hour <= Number(TimeSet[1]));

    if (SavedTimeSetIndex !== TimeSetIndex) {
      if (SavedTimeSetIndex !== -1) {
        ListsOfWeatherObjectInTimeSet.push({...ListsOfWeatherObject});
      }
      // Object.keys(ListsOfWeatherObject).forEach((key) => delete ListsOfWeatherObject[key]);
      ListsOfWeatherObject = makeEmptyListified<HelperWeatherObject>();
      SavedTimeSetIndex = TimeSetIndex;
    }

    if (TimeSetIndex != -1) {
      ListsOfWeatherObject.time.push(time);
      ListsOfWeatherObject.date.push(Date);
      ListsOfWeatherObject.TimeSetIndex.push(TimeSetIndex);
      ListsOfWeatherObject.symbol_code.push(Timeserie.data.next_1_hours.summary.symbol_code);
      ListsOfWeatherObject.air_temperature.push(WeatherData.air_temperature);
      ListsOfWeatherObject.wind_speed.push(WeatherData.wind_speed);
      ListsOfWeatherObject.wind_from_direction.push(WeatherData.wind_from_direction);
    }

    // const WeatherObject: FrontendWeatherObject = {
    //   time: TimeSets[TimeSetIndex]!,
    //   symbol_code,
    //   air_temperature: WeatherData.air_temperature,
    //   wind_speed: WeatherData.wind_speed,
    //   wind_from_direction: WeatherData.wind_from_direction,
    // };

    // if (TimeSetIndex != -1) {
    //   WeatherObjectTimeSetsList[TimeSetIndex]!.push(WeatherObject);
    // }
  }

  // let CurrentDay;
  // for (let index = 0; index < ListsOfWeatherObject.date.length; index++) {
  //   if (CurrentDay != ListsOfWeatherObject.date[index]) {
  //     if (index !== 0) {
  //     }
  //     CurrentDay = ListsOfWeatherObject.date[index];
  //   }

  const ListOfDayOfWeatherObjects: DayOfWeatherObjects[] = <any>[]
  for (const ListsOfWeatherObjectInTimeSet of ListsOfWeatherObjectAllDays) {
    const DayOfWeatherObjects: DayOfWeatherObjects = <any>{day: ListsOfWeatherObjectInTimeSet[0]!.date}
    const ListOfFrontendWeatherObject: FrontendWeatherObject[] = <any>[]
    for (const ListOfWeatherObject of ListsOfWeatherObjectInTimeSet) {
      const FrontendWeatherObject: FrontendWeatherObject = <any>{};

      FrontendWeatherObject.time = ListOfWeatherObject.time[0]! + "-" + ListOfWeatherObject.time[ListOfWeatherObject.time.length - 1]!;
      FrontendWeatherObject.symbol_code = ListOfWeatherObject.symbol_code[0]!; // NEEDS FIXING
      FrontendWeatherObject.air_temperature = ListOfWeatherObject.air_temperature.reduce((a, b) => a + b, 0) / ListOfWeatherObject.air_temperature.length;
      FrontendWeatherObject.wind_speed = ListOfWeatherObject.wind_speed.reduce((a, b) => a + b, 0) / ListOfWeatherObject.air_temperature.length;
      FrontendWeatherObject.wind_from_direction = ListOfWeatherObject.wind_from_direction.reduce((a, b) => a + b, 0) / ListOfWeatherObject.wind_from_direction.length;
      ListOfFrontendWeatherObject.push({...FrontendWeatherObject});
    }
    DayOfWeatherObjects.FrontendWeatherObject = [...ListOfFrontendWeatherObject]
    ListOfDayOfWeatherObjects.push({...DayOfWeatherObjects})
  }
  return res.json(ListOfDayOfWeatherObjects)








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