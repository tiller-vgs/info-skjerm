"use client";
import React from "react";
import { WeatherHours, WeatherDays } from "./Weather";
import DateTime from "./DateTime";
import Bus from "./Bus";
import Info from "./Info";

export default function InfoPage() {
  return (
    <main className="p-3">
      <div className=" w-full">
        <div className="grid grid-flow-col gap-4 float-left">
          <div className="row-span-1 mb-0">
            <DateTime />
          </div>
          <div className="row-span-3 mb-0">
            <WeatherHours />
          </div>
          <div className="row-span-1">
            <WeatherDays />
          </div>
        </div>
        <div className="float-right">
          <Bus south/>
          <Bus north/>
        </div>
      </div>
      <div className=" float-left mr-52">
        <Info />
      </div>
    </main>
  );
}
