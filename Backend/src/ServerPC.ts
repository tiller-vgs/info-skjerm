import {Router, Request, Response} from "express";
import {EntireWeather, DayOfWeatherObjects, FrontendWeatherObject, HelperWeatherObject, Listify} from "@models";
import {MakefetchWithRetry} from "@helpers";


const fetchWithRetry = MakefetchWithRetry("WeatherForecastController");


async function setDatabase() {
    const WeekOfWeather = await fetchWithRetry("http://localhost:3000/weather");
}

// make setDatabase run 24:00 each day FIX