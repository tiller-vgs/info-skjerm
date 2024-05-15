"use client";
import React from "react";
import { WeatherHours, WeatherDays } from "./Weather";
import DateTime from "./DateTime";
import Bus from "./Bus";
import Info from "./Info";

export default function InfoPage() {
  return (
    <main className="p-3">
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3">
          <DateTime />
        </div>
        <div className="row-span-3">
          <WeatherHours />
        </div>
        <div className="col-span-1">
          <WeatherDays />
        </div>
        {/* <div className="col-span-1">
          <Info />
        </div> */}
        <div className="row-span-3">
          <Bus />
        </div>
      </div>
      {/* <div className="">
        <Info />
      </div> */}
    </main>
  );
}
