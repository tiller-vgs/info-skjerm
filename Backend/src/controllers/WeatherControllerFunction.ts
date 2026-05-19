import { EntireWeather, DayOfWeatherObjects, FrontendWeatherObject, HelperWeatherObject, Listify } from "@models";
import { MakefetchWithRetry, makeEmptyListified, print } from "@helpers";
import { prisma } from "@prismaclient";

const fetchWithRetry = MakefetchWithRetry("WeatherForecastController");

const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

export async function GetWeatherAPI(DayAmount: number = 3) {
	// Fetches the WeatherAPI
	const response = await fetchWithRetry(API_URL);
	const json = (await response.json()) as EntireWeather;
	const Timeseries = json.properties.timeseries;
	
	// Gets varibles saved in the database
	const AdminTable = await prisma.adminTable.findUnique({ where: { id: 1 } });
	if (AdminTable === null) {
		console.error("Can't get adminTable from database");
		return [0, "Error"]; // res.status(0).send("Error"); // give better message FIX
	}
	const TimeSets: string[] = AdminTable.timesets || ["06:00-08:00", "11:00-12:00", "13:00-15:00", "16:00-17:00"];
	const TimeSetsHoures: string[][] = TimeSets.map(t => t.split("-").map(x => x.slice(0, 2)));
	let StartDate: string = AdminTable.startdate || "today";


	// DayAmount = 3; // FIX maybe if anyone wants to get dayamount from the db
	// if (UsedbForHourAmount) {
	// 	HourAmount = AdminTable.houramount || 3;
	// } else {
	// 	HourAmount = AdminTable.dbhouramount || 7;
	// }

	const EmptyHelperWeatherObject: HelperWeatherObject = {
		time: "**:**",
		date: "**:**",
		symbol_code: "*",
		air_temperature: NaN,
		wind_speed: NaN,
		wind_from_direction: NaN,
		filled: "false",
	};

	if (StartDate === "today") {
		StartDate = new Date().toISOString().split("T")[0]!;
		StartDate = StartDate.slice(5);
	}
	let StartDateDaysPlusMonth = Number(StartDate.split("-")[0]!) * 100 + Number(StartDate.split("-")[1]!);


	let FirstActiveDay: string = "";
	let SavedTimeSetIndex: number = 0;
	let SavedDays: number = -1;
	let LastSavedDatePlusMonth: number = StartDateDaysPlusMonth;
	let DaysExtended: number = 0;

	let ATimeSetOfFrontendWeatherObject: HelperWeatherObject[] = [];
	let AllTimeSetOfWeatherObject: HelperWeatherObject[][] = Array.from({ length: TimeSets.length }, () => []);
	for (let index = 0; index < AllTimeSetOfWeatherObject.length; index++) {
		const ATimeSetOfFrontendWeatherObject = Array.from({ length: Number(TimeSetsHoures[index]![1]) - Number(TimeSetsHoures[index]![0]) }, () => ({ ...EmptyHelperWeatherObject }));
		AllTimeSetOfWeatherObject[index] = ATimeSetOfFrontendWeatherObject;
	}
	let WeatherObjectDays: HelperWeatherObject[][][] = Array.from({ length: DayAmount }, () => [...AllTimeSetOfWeatherObject]);

	// Timeserie is where all the the information for one hour is
	for (const Timeserie of Timeseries) {
		try {
			// If the API stops giving hourly updates don't get more data
			if (!Timeserie.data.instant) {
				print("Broken Timeserie", Timeserie);
				break;
			}

			const FullDate = Timeserie.time.split("T")[0]!;
			const date = FullDate.slice(5);
			const DayPlusMonth = Number(date.split("-")[0]!) * 100 + Number(date.split("-")[1]!);

			const FullTime = Timeserie.time.split("T")[1]!.split("Z")[0]!;
			const time = FullTime.slice(0, -3);
			const Hour = Number(time.slice(0, 2));

			// Checks for if it needs to suplement with the database's stored values and if it is too early to run the code under here
			if (FirstActiveDay === "") {
				// If the date is not after StartDate dont run any code under this
				if (StartDateDaysPlusMonth + DaysExtended > DayPlusMonth) {
					continue;
				}
				// If the current hour is after the first timesets begining dalay the startday by 1 and give the first day the value stored in the database
				else if (Hour > Number(TimeSetsHoures[0]![0]!)) {
					print("Get today from database");
					WeatherObjectDays[DayPlusMonth - StartDateDaysPlusMonth + 1] = ((await prisma.earlyerWeatherdays.findUnique({ where: { id: 1 } }))!.data!.valueOf() as DayOfWeatherObjects).FrontendWeatherObject!.map(WeatherObject => {
						const length = Number(WeatherObject.time.split("-")[1]!.slice(0, -3)) - Number(WeatherObject.time.split("-")[0]!.slice(0, -3)) + 1;
						return Array.from({ length: length }, () => ({ ...WeatherObject, date: FullDate, filled: "true" })) as HelperWeatherObject[];
					});
					DaysExtended += 1;
					LastSavedDatePlusMonth += 1;
					continue;
				} else {
					FirstActiveDay = date;
				}
			}

			// If it has gone for more than allowed days stop the for loop
			const FirstActiveDayPlusMonth = Number(FirstActiveDay.split("-")[0]!) * 100 + Number(FirstActiveDay.split("-")[1]!);
			if (FirstActiveDayPlusMonth + DayAmount <= DayPlusMonth) {
				print("Broken because day is more than max day", SavedDays, FirstActiveDay, DayAmount, DayPlusMonth, FirstActiveDayPlusMonth + DayAmount);
				break;
			} else if (SavedDays >= DayAmount) { // Is a failsafe
				console.error("Error from WeatherControllerFunction:   Check for more than amount of days not working", "  ||  On Timeserie:   ", Timeserie);
				break;
			}

			// If its the next day save all timesets of WeatherObjects
			if (DayPlusMonth > LastSavedDatePlusMonth) {
				LastSavedDatePlusMonth = DayPlusMonth;
				SavedDays += 1;
				WeatherObjectDays[DayPlusMonth - StartDateDaysPlusMonth] = [...AllTimeSetOfWeatherObject];
				AllTimeSetOfWeatherObject = Array.from({ length: TimeSets.length }, () => []);
			}

			const TimeSetIndex = TimeSetsHoures.findIndex(TimeSet => Hour >= Number(TimeSet[0]) && Hour <= Number(TimeSet[1]));
			const WeatherData = Timeserie.data.instant.details;
			const WeatherObject: HelperWeatherObject = { ...EmptyHelperWeatherObject };
			if (TimeSetIndex >= 0) {
				WeatherObject.time = time;
				WeatherObject.date = FullDate;
				WeatherObject.symbol_code = Timeserie.data.next_1_hours.summary.symbol_code;
				WeatherObject.air_temperature = WeatherData.air_temperature;
				WeatherObject.wind_speed = WeatherData.wind_speed;
				WeatherObject.wind_from_direction = WeatherData.wind_from_direction;
				WeatherObject.filled = "true";
			}

			// If the current hour of data is not in the same TimeSet as the last hour of data add the list with all WeatherObject in the current Timeset to the list for current day
			if (SavedTimeSetIndex !== TimeSetIndex && SavedTimeSetIndex !== -1) {
				AllTimeSetOfWeatherObject[SavedTimeSetIndex] = [...ATimeSetOfFrontendWeatherObject];
				ATimeSetOfFrontendWeatherObject.length = 0;
			}

			if (TimeSetIndex >= 0) {
				ATimeSetOfFrontendWeatherObject.push({ ...WeatherObject });
			}
			SavedTimeSetIndex = TimeSetIndex;
		} catch (err) {
			print("Error from WeatherFunction: ", err, "On Timeserie: ", Timeserie);
		}
	}



	// THE NEXT PART SETS MOVES WEATHEROBJECTS SO THE FRONTEND CAN BETTER USE IT

	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const ListOfDayOfWeatherObjects: DayOfWeatherObjects[] = [];

	for (const AllTimeSetOfWeatherObject of WeatherObjectDays) {
		try {
			// print("TestForCombiningWeatherObjects", AllTimeSetOfWeatherObject[0]![0], AllTimeSetOfWeatherObject);
			// print("TestForCombiningWeatherObjects", days[new Date(AllTimeSetOfWeatherObject[0]![0]!.date).getDay()], new Date(AllTimeSetOfWeatherObject[0]![0]!.date).getDay(), AllTimeSetOfWeatherObject[0]![0]!.date, AllTimeSetOfWeatherObject[0]![0], AllTimeSetOfWeatherObject);

			const ADayOfTimeSetOfFrontendWeatherObject: FrontendWeatherObject[] = [] as FrontendWeatherObject[];
			let DayOfWeatherObjects: DayOfWeatherObjects = { day: "idk", date: "idk", FrontendWeatherObject: [] };
			
			try {
				DayOfWeatherObjects = { day: days[new Date(AllTimeSetOfWeatherObject[0]![0]!.date).getDay()] || "idk", date: AllTimeSetOfWeatherObject[0]![0]!.date || "idk", FrontendWeatherObject: [] };
			} catch (err) {
				print("Error from WeatherFunction: ", err);
			}

			for (const ATimeSetOfWeatherObject of AllTimeSetOfWeatherObject) {
				// Takes all WeatherObjects within a timeset and puts then into a listefied WeatherObjects (Meaning each property becomes a list of that property type)
				const ListifyFrontendWeatherObject: Listify<FrontendWeatherObject> = makeEmptyListified(EmptyHelperWeatherObject);
				for (let index = 0; index < ATimeSetOfWeatherObject.length; index++) {
					const WeatherObject = ATimeSetOfWeatherObject[index]!;
					if (WeatherObject.time != "") {
						ListifyFrontendWeatherObject.time.push(WeatherObject.time);
						ListifyFrontendWeatherObject.symbol_code.push(WeatherObject.symbol_code);
						ListifyFrontendWeatherObject.air_temperature.push(WeatherObject.air_temperature);
						ListifyFrontendWeatherObject.wind_speed.push(WeatherObject.wind_speed);
						ListifyFrontendWeatherObject.wind_from_direction.push(WeatherObject.wind_from_direction);
					} else {
						ListifyFrontendWeatherObject.time.push("--:--");
						ListifyFrontendWeatherObject.symbol_code.push("");
						ListifyFrontendWeatherObject.air_temperature.push(NaN);
						ListifyFrontendWeatherObject.wind_speed.push(NaN);
						ListifyFrontendWeatherObject.wind_from_direction.push(NaN);
					}
				}

				// Avrages the values for each timeset and merges it into one object
				const ATimeSetOfFrontendWeatherObject: FrontendWeatherObject = {} as FrontendWeatherObject;

				ATimeSetOfFrontendWeatherObject.time = ListifyFrontendWeatherObject.time[0]! + "-" + ListifyFrontendWeatherObject.time[ListifyFrontendWeatherObject.time.length - 1]!;
				ATimeSetOfFrontendWeatherObject.symbol_code = ListifyFrontendWeatherObject.symbol_code[Number((ListifyFrontendWeatherObject.symbol_code.length - 0.5).toFixed(0))]!;
				ATimeSetOfFrontendWeatherObject.air_temperature = ListifyFrontendWeatherObject.air_temperature.reduce((a, b) => a + b, 0) / ListifyFrontendWeatherObject.air_temperature.length;
				ATimeSetOfFrontendWeatherObject.wind_speed = ListifyFrontendWeatherObject.wind_speed.reduce((a, b) => a + b, 0) / ListifyFrontendWeatherObject.air_temperature.length;
				ATimeSetOfFrontendWeatherObject.wind_from_direction = ListifyFrontendWeatherObject.wind_from_direction.reduce((a, b) => a + b, 0) / ListifyFrontendWeatherObject.wind_from_direction.length;

				ADayOfTimeSetOfFrontendWeatherObject.push({ ...ATimeSetOfFrontendWeatherObject });
			}
			DayOfWeatherObjects.FrontendWeatherObject = [...ADayOfTimeSetOfFrontendWeatherObject];
			ListOfDayOfWeatherObjects.push({ ...DayOfWeatherObjects });
		} catch (err) {
			print("Error from WeatherFunction: ", err);
		}
	}

	return ListOfDayOfWeatherObjects.slice(1);
}
