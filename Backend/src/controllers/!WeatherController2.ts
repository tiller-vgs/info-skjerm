import {EntireWeather, DayOfWeatherObjects, FrontendWeatherObject, HelperWeatherObject, Listify} from "@models";
import { MakefetchWithRetry, makeEmptyListified } from "@helpers";
import {prisma} from "@prismaclient";


const fetchWithRetry = MakefetchWithRetry("WeatherForecastController");

const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

export async function GetWeatherAPI(dbDayAmount: boolean) {
  // check database for time sets and day amount
  const AdminTable = await prisma.adminTable.findUnique({where: {id: 1}});
  if (AdminTable === null) {
    console.error("Can't get adminTable from database");
    return [0, "Error"] // res.status(0).send("Error"); // give better message FIX
  }

  const EmptyHelperWeatherObject: HelperWeatherObject = {
		time: "",
		date: "",
		day: "",
		symbol_code: "",
		air_temperature: 0,
		wind_speed: 0,
		wind_from_direction: 0,
	};
  let DayAmount: number = 3;
  if (dbDayAmount) {
    DayAmount = AdminTable.dayamount || 3;
  } else {
    DayAmount = AdminTable.dbdayamount || 3;
  };

  const TimeSets: string[] = AdminTable.timesets || ["06:00-08:00", "11:00-12:00", "13:00-15:00", "15:00-17:00"];
  // const TimeSets: string[] = ["06:00-08:00", "11:00-12:00", "13:00-15:00", "15:00-17:00"];
  const TimeSetsHoures: string[][] = TimeSets.map((t) => t.split("-").map((x) => x.slice(0, 2)));
  const StartDate: string = AdminTable.startdate || "today";
  // const StartDate: string = "none";

  const response = await fetchWithRetry(API_URL);
  const json = (await response.json()) as EntireWeather;
  const Timeseries = json.properties.timeseries;
  // console.log("weathercontroller2: response:   ", Timeseries);

  let FirstDay: string = "";
  let SavedDay: string = "";
  let SavedTimeSetIndex: number = -1;

  // type listefy makes an object, an object where each property becomes a list with the origanrl property in it
  const ListsOfWeatherObjectAllDays: Listify<HelperWeatherObject>[][] = [];
  const ListsOfWeatherObjectInTimeSet: Listify<HelperWeatherObject>[] = [];
  const ListsOfWeatherObject: Listify<HelperWeatherObject> = makeEmptyListified(EmptyHelperWeatherObject);

  // Timeserie is where all the the information for one hour is
  for (const Timeserie of Timeseries) {
    // console.log("weathercontroller2: Timeserie:   ", Timeserie);
    const FullDate = Timeserie.time.split("T")[0]!;
    const Date = FullDate.slice(5, FullDate.length);
    const FullTime = Timeserie.time.split("T")[1]!.split("Z")[0]!;
    const time = FullTime.slice(0, FullTime.length - 3);
    const WeatherData = Timeserie.data.instant.details;

    // see if the date is after StartDate if not dont run any code under this
    if (FirstDay === "") {
      if (StartDate !== "today") {
        if (Number(StartDate.split("-")[0]!) * 30 + Number(StartDate.split("-")[1]!) > Number(Date.split("-")[0]!) * 30 + Number(Date.split("-")[1]!)) continue;
      }
      FirstDay = Date;
    }
    // see if the date have changed if so add list of current day to the list with all days
    if (SavedDay !== Date) {
      if (SavedDay != "") {
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
    // console.log("weathercontroller2: TimeSetIndex:   ", TimeSetIndex, "  --  ", Hour, "  --  ", TimeSetsHoures, "  --  ", time);

    // if the current Timeserie is not in the same TimeSet as the last if so add list with current Timeset to the list for current day
    if (SavedTimeSetIndex !== TimeSetIndex) {
      if (SavedTimeSetIndex !== -1) {
        ListsOfWeatherObjectInTimeSet.push({...ListsOfWeatherObject});
      }
      Object.keys(ListsOfWeatherObject).forEach((key) => ListsOfWeatherObject[key as keyof typeof ListsOfWeatherObject] = []); // try to change the line under to this FIX // aks witch is best
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

  // avrages the values for each timeset and put it in the right format
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const ListOfDayOfWeatherObjects: DayOfWeatherObjects[] = [];
  for (const ListsOfWeatherObjectInTimeSet of ListsOfWeatherObjectAllDays) {
    const DayOfWeatherObjects: DayOfWeatherObjects = {day: days[new Date(ListsOfWeatherObjectInTimeSet[0]!.date[0]!).getDay()] || "idk", FrontendWeatherObject: []};
    const ListOfFrontendWeatherObject: FrontendWeatherObject[] = [];

    for (const ListOfWeatherObject of ListsOfWeatherObjectInTimeSet) {
      const FrontendWeatherObject: FrontendWeatherObject = {} as FrontendWeatherObject;

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

  return ListOfDayOfWeatherObjects;
}
