export * from "./Event.ts";
export * from "./BusDepartureJsonResponse.ts";
export * from "./BusDepartures.ts";
export * from "./WeatherForecastObject.ts";
export * from "./WeatherJsonResponse.ts";
export * from "./WeatherJsonResponseNextDays.ts";
export * from "./WeatherJsonResponseToday.ts";
export * from "./WeatherObjects.ts";

/*
Oppsett av alle typer:
From BusDepartureJsonResponse:
BusStop     | BusRoute

From BusDepartures:
Businfo
DataBus
StopPlace
EstimatedCalls
DestinationDisplay  | Quay  |  ServiceJourney
                            || JourneyPattern
                            || Line

From Event:
EventsType

From WeatherForecastObject:
WeatherForecastInfo
Properties
TimeSeries
Data
Instant     |  Next_1_Hours  |  Next_6_Hours
Details     || Summary       || Summary

From WeatherJsonResponse:
WeatherJsonResponse

From WeatherJsonResponseNextDays:
NextDaysWeatherForcast  | WeatherJsonResponseNextDays

From WeatherJsonResponseToday:
TodayWeatherForcast     | WeatherJsonResponseToday
*/