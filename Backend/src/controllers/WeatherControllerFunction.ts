import { EntireWeather, DayOfWeatherObjects, FrontendWeatherObject, HelperWeatherObject, Listify } from "@models";
import { MakefetchWithRetry, makeEmptyListified, print } from "@helpers";
import { prisma } from "@prismaclient";

const fetchWithRetry = MakefetchWithRetry("WeatherForecastController");

const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

export async function GetWeatherAPI(dbDayAmount: boolean) {
	// check database for time sets and day amount
	const AdminTable = await prisma.adminTable.findUnique({ where: { id: 1 } });
	if (AdminTable === null) {
		console.error("Can't get adminTable from database");
		return [0, "Error"]; // res.status(0).send("Error"); // give better message FIX
	}

	const EmptyHelperWeatherObject: HelperWeatherObject = {
		time: "",
		date: "",
		symbol_code: "",
		air_temperature: 0,
		wind_speed: 0,
		wind_from_direction: 0,
		filled: "false",
	};
	let DayAmount: number = 3;
	if (dbDayAmount) {
		DayAmount = AdminTable.dayamount || 3;
	} else {
		DayAmount = AdminTable.dbdayamount || 7;
	}

	const TimeSets: string[] = AdminTable.timesets || ["06:00-08:00", "11:00-12:00", "13:00-15:00", "16:00-17:00"];
	// const TimeSets: string[] = ["06:00-08:00", "11:00-12:00", "13:00-15:00", "15:00-17:00"];
	const TimeSetsHoures: string[][] = TimeSets.map(t => t.split("-").map(x => x.slice(0, 2)));
	let StartDate: string = AdminTable.startdate || "today";
	if (StartDate === "today") {
		StartDate = new Date().toISOString().split("T")[0]!;
		StartDate = StartDate.slice(5, StartDate.length);
	}
	let StartDateDaysPlusMonth = Number(StartDate.split("-")[0]!) * 100 + Number(StartDate.split("-")[1]!);

	const response = await fetchWithRetry(API_URL);
	const json = (await response.json()) as EntireWeather;
	const Timeseries = json.properties.timeseries;
	// console.log("weathercontroller2: response:   ", Timeseries);

	let FirstDay: string = "";
	let SavedDay: string = "";
	let SavedTimeSetIndex: number = -1;
	let SavedDays: number = -1;
	let LastSavedDatePlusMonth: number = StartDateDaysPlusMonth;
  let DaysExtended:number = 0;

	// type listefy makes an object, an object where each property becomes a list with the origanrl property in it
	const ListsOfWeatherObjectAllDays: Listify<HelperWeatherObject>[][] = [];
	const ListsOfWeatherObjectInTimeSet: Listify<HelperWeatherObject>[] = [];
	let ListsOfWeatherObject: Listify<HelperWeatherObject> = makeEmptyListified(EmptyHelperWeatherObject);
	let ATimeSetOfFrontendWeatherObject: HelperWeatherObject[] = []
	let AllTimeSetOfWeatherObject: HelperWeatherObject[][] = Array.from({ length: TimeSets.length }, () => ([ ...ATimeSetOfFrontendWeatherObject ]));
	let WeatherObjectDays: HelperWeatherObject[][][] = Array.from({ length: DayAmount }, () => [...AllTimeSetOfWeatherObject]);

	// Timeserie is where all the the information for one hour is
	// for (const Timeserie of Timeseries) {
	//   // console.log("weathercontroller2: Timeserie:   ", Timeserie);
	//   const FullDate = Timeserie.time.split("T")[0]!;
	//   const date = FullDate.slice(5, FullDate.length);

	//   // see if the date is after StartDate if not dont run any code under this
	//   if (FirstDay === "") {
	//     if (StartDate !== "today") {
	//       if (Number(StartDate.split("-")[0]!) * 100 + Number(StartDate.split("-")[1]!) > Number(date.split("-")[0]!) * 100 + Number(date.split("-")[1]!)) continue;
	//     }
	//     FirstDay = date;
	//   }
	//   // see if the date have changed if so add list of current day to the list with all days
	//   if (SavedDay !== date) {
	//     if (SavedDay != "") {
	//       if (SavedTimeSetIndex !== -1) {
	//         ListsOfWeatherObjectInTimeSet.push({ ...ListsOfWeatherObject });
	//         SavedTimeSetIndex = -1;
	//       }
	//       ListsOfWeatherObjectAllDays.push([...ListsOfWeatherObjectInTimeSet]);
	//     }
	//     ListsOfWeatherObjectInTimeSet.length = 0;
	//     SavedDay = date;
	//   }
	//   // see if the current date is more than the DayAmount allows
	//   if (Number(FirstDay.split("-")[0]!) * 100 + Number(FirstDay.split("-")[1]!) + DayAmount <= Number(date.split("-")[0]!) * 100 + Number(date.split("-")[1]!)) {
	//     break;
	//   }

	//   // get the index for with part of TimeSets this Timeserie is
	//   const FullTime = Timeserie.time.split("T")[1]!.split("Z")[0]!;
	//   const time = FullTime.slice(0, FullTime.length - 3);
	//   const Hour = Number(time.slice(0, 2));
	//   const TimeSetIndex = TimeSetsHoures.findIndex((TimeSet) => Hour >= Number(TimeSet[0]) && Hour <= Number(TimeSet[1]));
	//   // console.log("weathercontroller2: TimeSetIndex:   ", TimeSetIndex, "  --  ", Hour, "  --  ", TimeSetsHoures, "  --  ", time);

	//   // if the current Timeserie is not in the same TimeSet as the last if so add list with current Timeset to the list for current day
	//   if (SavedTimeSetIndex !== TimeSetIndex) {
	//     if (SavedTimeSetIndex !== -1) {
	//       ListsOfWeatherObjectInTimeSet.push({ ...ListsOfWeatherObject });
	//     }
	//     Object.keys(ListsOfWeatherObject).forEach((key) => ListsOfWeatherObject[key as keyof typeof ListsOfWeatherObject] = []);
	//     SavedTimeSetIndex = TimeSetIndex;
	//   }

	//   const WeatherData = Timeserie.data.instant.details;
	//   if (TimeSetIndex != -1) {
	//     ListsOfWeatherObject.time.push(time);
	//     ListsOfWeatherObject.date.push(date);
	//     ListsOfWeatherObject.symbol_code.push(Timeserie.data.next_1_hours.summary.symbol_code);
	//     ListsOfWeatherObject.air_temperature.push(WeatherData.air_temperature);
	//     ListsOfWeatherObject.wind_speed.push(WeatherData.wind_speed);
	//     ListsOfWeatherObject.wind_from_direction.push(WeatherData.wind_from_direction);
	//   }
	// }

	for (const Timeserie of Timeseries) {
		try {
			print("Timeserie", Timeserie);
			// console.log("weathercontroller2: Timeserie:   ", Timeserie);
			const FullDate = Timeserie.time.split("T")[0]!;
			const date = FullDate.slice(5, FullDate.length);
			const DayPlusMonth = Number(date.split("-")[0]!) * 100 + Number(date.split("-")[1]!);

			// get the index for with part of TimeSets this Timeserie is
			const FullTime = Timeserie.time.split("T")[1]!.split("Z")[0]!;
			const time = FullTime.slice(0, FullTime.length - 3);
			const Hour = Number(time.slice(0, 2));

			// console.log("weathercontroller2: TimeSetIndex:   ", TimeSetIndex, "  --  ", Hour, "  --  ", TimeSetsHoures, "  --  ", time);

			// NEW CODE

			// see if the date is after StartDate if not dont run any code under this
			if (FirstDay === "") {
				// print(date, FirstDay, StartDate, StartDateDaysPlusMonth, DayPlusMonth);
				if (StartDateDaysPlusMonth + DaysExtended > DayPlusMonth) continue;
				// print(date + " is or is after first allowed day: ", FirstDay);

				if (Hour > Number(TimeSetsHoures[0]![0]!)) {
					// GET LIST FROM DATABSE FIX
					// print("Get today from database");
					WeatherObjectDays[DayPlusMonth - StartDateDaysPlusMonth] = Array.from({ length: TimeSets.length }, () => ([ ...ATimeSetOfFrontendWeatherObject ])); // GET LIST FROM DATABSE
					DaysExtended += 1;
					LastSavedDatePlusMonth += 1;
					continue;
				} else {
					// print("set firstday");
					FirstDay = date;
				}
			}
			// see if the current date is more than the DayAmount allows
			if (Number(FirstDay.split("-")[0]!) * 100 + Number(FirstDay.split("-")[1]!) + DayAmount <= DayPlusMonth) {
				print("Broken because day is more than max day", SavedDays, FirstDay, DayAmount, DayPlusMonth, Number(FirstDay.split("-")[0]!) * 100 + Number(FirstDay.split("-")[1]!) + DayAmount);
				break;
			}
			if (SavedDays >= DayAmount) {
				console.error("Error for WeatherControllerFunction:   Check for more than amount of days not working", "  ||  On Timeserie:   ", Timeserie);
			}
			// console.log("SavedDays:  ", SavedDays, "  ||  DayAmount:  ", DayAmount);

			// see if the date have changed if so add list of current day to the list with all days
			if (DayPlusMonth > LastSavedDatePlusMonth) {
				LastSavedDatePlusMonth = DayPlusMonth;
				SavedDays += 1;
				// print("Test make WeatherObjectDays:", FullDate, AllTimeSetOfWeatherObject, StartDateDaysPlusMonth, DayPlusMonth, WeatherObjectDays, SavedDays);
				WeatherObjectDays[DayPlusMonth - StartDateDaysPlusMonth] = [...AllTimeSetOfWeatherObject];
				AllTimeSetOfWeatherObject = Array.from({ length: TimeSets.length }, () => ([]));
      }
      
			const TimeSetIndex = TimeSetsHoures.findIndex(TimeSet => Hour >= Number(TimeSet[0]) && Hour <= Number(TimeSet[1]));
			const WeatherData = Timeserie.data.instant.details;
			if (TimeSetIndex != -1) {
				const WeatherObject: HelperWeatherObject = {
					time: time,
					date: FullDate,
					symbol_code: Timeserie.data.next_1_hours.summary.symbol_code,
					air_temperature: WeatherData.air_temperature,
					wind_speed: WeatherData.wind_speed,
					wind_from_direction: WeatherData.wind_from_direction,
					filled: "true",
				};
				print("WeatherObject made", WeatherObject, TimeSetIndex);

        

				// if the current Timeserie is not in the same TimeSet as the last if so add list with current Timeset to the list for current day
        if (SavedTimeSetIndex !== TimeSetIndex) {
          AllTimeSetOfWeatherObject[TimeSetIndex]! = [...ATimeSetOfFrontendWeatherObject];
          ATimeSetOfFrontendWeatherObject.length = 0;
        }

        ATimeSetOfFrontendWeatherObject.push({ ...WeatherObject });

        SavedTimeSetIndex = TimeSetIndex;
			}
		} catch (err) {
			print("Error for WeatherControllerFunction:   ", err, "  ||  On Timeserie:   ", Timeserie);
		}
	}

	// avrages the values for each timeset and put it in the right format
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const ListOfDayOfWeatherObjects: DayOfWeatherObjects[] = [];
	// const ListOfTimeSetWorthOfFrontendWeatherObjects: Listify<FrontendWeatherObject>[] = [] as Listify<FrontendWeatherObject>[];

  print(WeatherObjectDays);
	for (const AllTimeSetOfWeatherObject of WeatherObjectDays) {
    
		print("TestForCombiningWeatherObjects", AllTimeSetOfWeatherObject[0]![0], AllTimeSetOfWeatherObject);
		// print("TestForCombiningWeatherObjects", days[new Date(AllTimeSetOfWeatherObject[0]![0]!.date).getDay()], new Date(AllTimeSetOfWeatherObject[0]![0]!.date).getDay(), AllTimeSetOfWeatherObject[0]![0]!.date, AllTimeSetOfWeatherObject[0]![0], AllTimeSetOfWeatherObject);
    
    // FIX idk if needed
		const DayOfWeatherObjects: DayOfWeatherObjects = { day: days[new Date(AllTimeSetOfWeatherObject[0]![0]!.date).getDay()] || "idk", date: AllTimeSetOfWeatherObject[0]![0]!.date, FrontendWeatherObject: [] };
		// const DayOfWeatherObjects: DayOfWeatherObjects = { day: days[new Date(ListsOfWeatherObjectInTimeSet[0]!.date[0]!).getDay()] || "idk", FrontendWeatherObject: [] };
		// const DayOfWeatherObjects: DayOfWeatherObjects = { day: "idk", FrontendWeatherObject: [] };


    const ADayOfTimeSetOfFrontendWeatherObject: FrontendWeatherObject[] = [] as FrontendWeatherObject[];

    for (const ATimeSetOfWeatherObject of AllTimeSetOfWeatherObject) {
      const ListifyFrontendWeatherObject: Listify<FrontendWeatherObject> = makeEmptyListified(EmptyHelperWeatherObject) as Listify<FrontendWeatherObject>;

      for (const WeatherObject of ATimeSetOfWeatherObject) {
				ListifyFrontendWeatherObject.time.push(WeatherObject.time);
				ListifyFrontendWeatherObject.symbol_code.push(WeatherObject.symbol_code);
				ListifyFrontendWeatherObject.air_temperature.push(WeatherObject.air_temperature);
				ListifyFrontendWeatherObject.wind_speed.push(WeatherObject.wind_speed);
				ListifyFrontendWeatherObject.wind_from_direction.push(WeatherObject.wind_from_direction);
      }

      const ATimeSetOfFrontendWeatherObject: FrontendWeatherObject = {} as FrontendWeatherObject;
      // for (const WeatherObject of ATimeSetOfWeatherObject) {
      print("ListifyFrontendWeatherObject.time.length: ", ListifyFrontendWeatherObject.time.length, ListifyFrontendWeatherObject);
      ATimeSetOfFrontendWeatherObject.time = ListifyFrontendWeatherObject.time[0]! + "-" + ListifyFrontendWeatherObject.time[ListifyFrontendWeatherObject.time.length - 1]!;
      ATimeSetOfFrontendWeatherObject.symbol_code = ListifyFrontendWeatherObject.symbol_code[Number((ListifyFrontendWeatherObject.symbol_code.length - 0.5).toFixed(0))]!; // NEEDS FIXING // ask martin how he want theise to be shown
      ATimeSetOfFrontendWeatherObject.air_temperature = ListifyFrontendWeatherObject.air_temperature.reduce((a, b) => a + b, 0) / ListifyFrontendWeatherObject.air_temperature.length;
      ATimeSetOfFrontendWeatherObject.wind_speed = ListifyFrontendWeatherObject.wind_speed.reduce((a, b) => a + b, 0) / ListifyFrontendWeatherObject.air_temperature.length;
      ATimeSetOfFrontendWeatherObject.wind_from_direction = ListifyFrontendWeatherObject.wind_from_direction.reduce((a, b) => a + b, 0) / ListifyFrontendWeatherObject.wind_from_direction.length;

      ADayOfTimeSetOfFrontendWeatherObject.push({ ...ATimeSetOfFrontendWeatherObject });
      // }
      
		}

		
		

		// for (const WeatherObject of WeatherObjectInTimeSet) {
			// console.log("Test2((ListifyFrontendWeatherObject.symbol_code.length - 0.5).toFixed(0)):   ", ListifyFrontendWeatherObject.symbol_code.length / 2 - 0.5, (ListifyFrontendWeatherObject.symbol_code.length / 2 - 0.5).toFixed(0), Number((ListifyFrontendWeatherObject.symbol_code.length / 2 - 0.5).toFixed(0)));
			// const ATimeSetWorthOfFrontendWeatherObjects: FrontendWeatherObject = {} as FrontendWeatherObject;

			// print("ListifyFrontendWeatherObject.time.length: ", ListifyFrontendWeatherObject.time.length, ListifyFrontendWeatherObject);
			// ATimeSetOfFrontendWeatherObject.time = ListifyFrontendWeatherObject.time[0]! + "-" + ListifyFrontendWeatherObject.time[ListifyFrontendWeatherObject.time.length - 1]!;
			// ATimeSetOfFrontendWeatherObject.symbol_code = ListifyFrontendWeatherObject.symbol_code[Number((ListifyFrontendWeatherObject.symbol_code.length - 0.5).toFixed(0))]!; // NEEDS FIXING // ask martin how he want theise to be shown
			// ATimeSetOfFrontendWeatherObject.air_temperature = ListifyFrontendWeatherObject.air_temperature.reduce((a, b) => a + b, 0) / ListifyFrontendWeatherObject.air_temperature.length;
			// ATimeSetOfFrontendWeatherObject.wind_speed = ListifyFrontendWeatherObject.wind_speed.reduce((a, b) => a + b, 0) / ListifyFrontendWeatherObject.air_temperature.length;
			// ATimeSetOfFrontendWeatherObject.wind_from_direction = ListifyFrontendWeatherObject.wind_from_direction.reduce((a, b) => a + b, 0) / ListifyFrontendWeatherObject.wind_from_direction.length;

			
		// }
		DayOfWeatherObjects.FrontendWeatherObject = [...ADayOfTimeSetOfFrontendWeatherObject];
		ListOfDayOfWeatherObjects.push({ ...DayOfWeatherObjects });
	}

	return ListOfDayOfWeatherObjects;
}
