import Image from "next/image";
import React from "react";
import WeatherComponent from "./WeatherComponent";

import { weatherData } from "@/data";

export default function Weather() {
  return (
    <div className="border-2 border-white rounded-lg w-screen h-28 flex items-center justify-center">
      <div className="w-full">
        <div className=" p-2 grid grid-cols-7 w-full">
          {weatherData.slice(0, 7).map((data) => {
            return (
              <WeatherComponent
                key={data.date}
                date={data.date}
                temperature={data.temperature}
                symbolCode={data.symbolCode}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
