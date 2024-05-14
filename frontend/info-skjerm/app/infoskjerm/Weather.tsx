import { useEffect, useState } from "react";
import WeatherComponent from "./WeatherComponent";

import { weatherDataDays, weatherDataHours } from "@/data";
import { weatherData } from "@/types";

export function WeatherDays() {
  return (
    <div className="border-2 border-slate-500 rounded-lg h-28 flex items-center justify-center">
      <div className="w-full">
        <div className=" p-2 grid grid-cols-7 w-full">
          {weatherDataDays.slice(0, 7).map((data) => {
            return (
              <WeatherComponent
                key={data.date}
                date={data.date}
                temperature={data.temperature}
                symbolCode={data.symbolCode}
                showWeek
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function WeatherHours() {
  const [weatherHoursData, setWeatherHoursData] = useState<weatherData>();

  useEffect(() => {
    fetch("http://localhost:5237/WeatherForecast/weatherforecast")
      .then((response) => response.json())
      .then((data) => setWeatherHoursData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="border-2 border-slate-500 rounded-lg h-28 flex items-center justify-center">
      <div className="w-full">
        <div className=" p-2 grid grid-cols-7 w-full">
          {weatherDataHours.slice(0, 4).map((data) => {
            return (
              <WeatherComponent
                key={data.date}
                date={data.date}
                temperature={data.temperature}
                symbolCode={data.symbolCode}
                showHours
              />
            );
          })}
          {/* {weatherHoursData && (
            <WeatherComponent
              // key={data.date}
              date={"2021-10-10T10:00:00Z"}
              temperature={parseInt(
                Math.floor(weatherHoursData.airTemperature)
              )}
              symbolCode={weatherHoursData.symbolCode}
              showHours
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
