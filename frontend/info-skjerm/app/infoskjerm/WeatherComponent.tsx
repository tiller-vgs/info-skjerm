import Image from "next/image";
import React from "react";

interface WeatherComponentProps {
  date: string;
  temperature: number;
  symbolCode: string;
}

export default function WeatherComponent({
  date,
  temperature,
  symbolCode,
}: WeatherComponentProps) {
  const days = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
  ];
  const day = days[new Date(date).getDay()];

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl">{day}</h1>
        <Image
          src={`/WeatherSymbols/darkmode/png/200/${symbolCode}.png`}
          width={50}
          height={50}
          alt={symbolCode}
        />
        <h2
          className={`text-xl font-bold ${
            temperature >= 0 ? "text-red-500" : "text-blue-500"
          }`}
        >
          {temperature}
        </h2>
      </div>
    </>
  );
}
