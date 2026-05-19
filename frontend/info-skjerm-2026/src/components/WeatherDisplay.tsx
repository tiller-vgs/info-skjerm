import { useWeather } from "../hooks/useWeather";
import type { WeatherDay, WeatherObject } from "../types/types";

function WeatherDisplay() {
  // Henter værdager fra hook
  const days: WeatherDay[] = useWeather();

  return (
    // Viser de to første dagene side om side
    <div className="flex flex-row">
      {days?.slice(0, 2).map((day: WeatherDay, i: number) => (
        <div
          key={i}
          className="rounded-xl border-5 border-tqboxes p-2 text-center m-2 inline-block"
        >
          {/* Navn på dagen */}
          <p className="text-4xl">{day.day}</p>

          {/* Værperioder for dagen */}
          <div className="flex gap-2 mt-2 justify-center">
            {day.WeatherObjects.map(
              (weatherPeriod: WeatherObject, j: number) => (
                <div key={j} className="border-4 border-tqboxes p-2 w-32 h-32">
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
