"use client";

import { BusItem, busDataValues } from "@/types";
import React, { useEffect, useState, useTransition } from "react";

interface Props {
  south?: boolean;
  north?: boolean;
}

export default function Bus({ south, north }: Props) {
  const [busData, setBusData] = useState<busDataValues | null>();
  const [isPending, startTransition] = useTransition();
  const [firstRender, setFirstRender] = useState(true);

  const fetchBusData = () => {
    startTransition(async () => {
      await fetch("http://localhost:5237/BusTimes/departures?num=15")
        .then((response) => response.json())
        .then((data) => setBusData(data))
        .catch((error) => console.error("Error:", error));
    });
  };

  useEffect(() => {
    if (firstRender) {
      setBusData(null);
      fetchBusData();
      setFirstRender(false);
    }
    setInterval(() => {
      setBusData(null);
      fetchBusData();
    }, 1000 * 30);
  }, [firstRender]);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="border-2 border-slate-500 rounded-lg h-auto pb-2">
      <div>
        <h1 className="text-2xl font-bold text-center p-1">
          {south ? "Tillerterminalen 1" : "Tillerterminalen 2"}
        </h1>
        <div className="flex justify-between flex-col-3 gap-2 border-b border-slate-700 p-2 mb-2">
          <h1>Linje</h1>
          <h1 className="mr-10">Til</h1>
          <h1>Kl.</h1>
        </div>
        <div className="p-2">
          {busData && busData ? (
            south ? (
              busData.northBound.map((data: BusItem) => (
                <div
                  key={data.busLine}
                  className="flex justify-between flex-col-3 gap-2 border-b border-slate-700 pb-2 mb-2"
                >
                  <h2 className="text-xl font-bold">{data.busLine}</h2>
                  <h2 className="text-xl font-bold">{data.destination}</h2>
                  <p
                    className={`text-lg font-bold ${
                      data.isRealTime ? "text-yellow-300" : "white"
                    }`}
                  >
                    {formatTime(data.time)}
                  </p>
                </div>
              ))
            ) : (
              busData.southBound.map((data: BusItem) => (
                <div
                  key={data.busLine}
                  className="flex justify-between flex-col-3 gap-2 border-b border-slate-700 pb-2 mb-2"
                >
                  <h2 className="text-xl font-bold">{data.busLine}</h2>
                  <h2 className="text-xl font-bold">{data.destination}</h2>
                  <p
                    className={`text-lg font-bold ${
                      data.isRealTime ? "text-yellow-300" : "white"
                    }`}
                  >
                    {formatTime(data.time)}
                  </p>
                </div>
              ))
            )
          ) : (
            <h1 className="text-2xl font-bold text-center p-1">Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
