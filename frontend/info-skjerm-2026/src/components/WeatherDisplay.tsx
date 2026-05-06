import { useWeather } from "../hooks/useWeather";
import type { WeatherDay, WeatherObject } from "../types/types";

function WeatherDisplay() {
  const days: WeatherDay[] = useWeather();

  return (
    <div className="flex flex-row">
      {days?.slice(0, 2).map((day: WeatherDay, i: number) => (
        <div
          key={i}
          className="rounded-xl border-5 border-tqboxes p-2 text-center m-2 inline-block"
        >
          <p className="text-4xl">{day.day}</p>
          <div className="flex gap-2 mt-2 justify-center">
            {day.WeatherObjects.map(
              (weatherPeriod: WeatherObject, j: number) => (
                <div key={j} className="border-4 border-tqboxes p-2 w-32 h-40">
                  {weatherPeriod.time}
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherDisplay;
