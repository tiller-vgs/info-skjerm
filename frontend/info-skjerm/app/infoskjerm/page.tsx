"use client";
import React, { useState, useEffect } from "react";
import { WeatherHours, WeatherDays } from "./Weather";
import DateTime from "./DateTime";
import Bus from "./Bus";
import Info from "./Info";
import { TQLeaderboard } from "./TQLeaderboard";
import { Slideshow } from "./Slideshow";

export default function InfoPage() {
  const [currentView, setCurrentView] = useState(0);
  const rotationInterval = 30000; // 30 seconds

  // Define the components to rotate through
  const views = [
    // { component: <Info />, name: "Info" },
    { component: <TQLeaderboard />, name: "TillerQuest" },
    // { component: <Slideshow />, name: "Bildefremvisning" },
  ];

  // Auto rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % views.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [views.length]);

  return (
    <main className="p-3">
      <div className="grid grid-cols-8 grid-rows-5 gap-4">
        <div className="col-start-1 row-start-1 col-span-1 row-span-1">
          <DateTime />
        </div>
        <div className="col-start-2 row-start-1 col-span-2 row-span-1">
          <WeatherHours />
        </div>
        <div className="col-start-4 row-start-1 col-span-3 row-span-1">
          <WeatherDays />
        </div>
        <div className="col-start-7 row-start-1 col-span-2 row-span-5">
          <Bus south />
          <Bus north />
        </div>
        <div className="col-start-1 row-start-2 col-span-6 row-span-4 relative">
          {/* View indicators */}
          {views.length > 1 && (
            <div className="absolute -top-8 right-2 flex space-x-2 z-10">
              {views.map((view, index) => (
                <div
                  key={index}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    index === currentView
                      ? "bg-yellow-400 text-gray-800"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {view.name}
                </div>
              ))}
            </div>
          )}

          {/* Current view */}
          <div className="transition-opacity duration-500 h-full">
            {views[currentView].component}
          </div>
        </div>
      </div>
    </main>
  );
}
