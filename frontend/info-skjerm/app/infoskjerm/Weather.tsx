import { useEffect, useState, useTransition } from "react";
import WeatherComponent from "./WeatherComponent";

import { weatherData } from "@/types";

export function WeatherDays() {
  const [weatherDaysData, setWeatherDaysData] = useState<weatherData>();
  const [isPending, startTransition] = useTransition();
  const [firstRender, setFirstRender] = useState(true);

  const fetchWeather = () => {
    startTransition(async () => {
      await fetch("http://localhost:5237/WeatherForecast/NextDays")
        .then((response) => response.json())
        .then((data) => setWeatherDaysData(data))
        .catch((error) => console.error("Error:", error));
    });
  };

  useEffect(() => {
    if (firstRender) {
      fetchWeather();
      setFirstRender(false);
    }
    setInterval(() => {
      if (new Date().getHours() === 12) {
        fetchWeather();
      }
    }, 1000 * 60 * 60);
  }, []);

  return (
    <div className="border-2 border-slate-500 rounded-lg h-28 flex items-center justify-center">
      <div className="w-full">
        <div className=" p-2 grid grid-cols-5 w-full">
          {isPending ? (
            <p>Loading...</p>
          ) : (
            weatherDaysData &&
            weatherDaysData.slice(0, 5).map((data) => {
              return (
                <WeatherComponent
                  key={data.time}
                  date={data.time}
                  temperature={Math.floor(data.airTemperature)}
                  symbolCode={data.symbol_code}
                  showWeek
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export function WeatherHours() {
  const [weatherHoursData, setWeatherHoursData] = useState<weatherData>();
  const [isPending, startTransition] = useTransition();
  const [firstRender, setFirstRender] = useState(true);

  const fetchWeather = () => {
    startTransition(async () => {
      await fetch("http://localhost:5237/WeatherForecast/Today")
        .then((response) => response.json())
        .then((data) => setWeatherHoursData(data))
        .catch((error) => console.error("Error:", error));
    });
  };

  useEffect(() => {
    if (firstRender) {
      fetchWeather();
      setFirstRender(false);
    }
    setInterval(() => {
      if (new Date().getMinutes() === 15) {
        startTransition(async () => {
          fetchWeather();
        });
      }
    }, 1000 * 60);
  }, []);

  return (
    <div className="border-2 border-slate-500 rounded-lg h-28 flex items-center justify-center">
      <div className="w-full">
        <div className=" p-2 grid grid-cols-5 w-full">
          {isPending ? (
            <p>Loading...</p>
          ) : (
            weatherHoursData &&
            weatherHoursData.slice(0, 5).map((data) => {
              return (
                <div key={data.time} className=" w-16">
                  <WeatherComponent
                    date={data.time}
                    temperature={Math.floor(data.airTemperature)}
                    symbolCode={data.symbol_code}
                    showHours
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
