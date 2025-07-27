import { useEffect, useState, useTransition } from "react";
import WeatherComponent from "./WeatherComponent";

import { WeatherData } from "@/types";
import { getTodayWeather, getWeekWeather } from "@/actions";

export function WeatherDays() {
  const [weatherDaysData, setWeatherDaysData] = useState<WeatherData>();
  const [isPending, startTransition] = useTransition();
  const [firstRender, setFirstRender] = useState(true);

  const fetchWeather = () => {
    startTransition(async () => {
      let weatherdata = await getWeekWeather();
      setWeatherDaysData(weatherdata);
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
    }, 1000 * 60 * 60); // fetch every hour at 12
  }, [firstRender]);

  return (
    <div className="border-2 border-slate-500 rounded-lg h-28 flex items-center justify-center p-2">
      <div className="w-full">
        <div className=" p-5 grid grid-cols-5 w-full gap-8">
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
  const [weatherHoursData, setWeatherHoursData] = useState<WeatherData>();
  const [isPending, startTransition] = useTransition();
  const [firstRender, setFirstRender] = useState(true);

  const fetchWeather = () => {
    startTransition(async () => {
      let weatherdata = await getTodayWeather();
      setWeatherHoursData(weatherdata);
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
  }, [firstRender]);

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
