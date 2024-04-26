import Image from "next/image";
import React from "react";
import WeatherComponent from "./WeatherComponent";

import { weatherDataDays, weatherDataHours } from "@/data";

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
  return (
    <div className="border-2 border-slate-500 rounded-lg h-28 flex items-center justify-center">
      <div className="w-full">
        <div className=" p-2 grid grid-cols-7 w-full">
          {weatherDataHours.slice(0, 7).map((data) => {
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
        </div>
      </div>
    </div>
  )
}
