export * from "./BusDepartures.ts";
export * from "./WeatherObjects.ts";
export * from "./Announcement.ts";

export type Listify<T> = { [K in keyof T]: T[K][] };


/*
PLEASE FIX DETTE ER FIEL

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

From WeatherOutputObjects:
DayOfWeatherObjects     | FrontendWeatherObject

From Generell:
Listify
*/