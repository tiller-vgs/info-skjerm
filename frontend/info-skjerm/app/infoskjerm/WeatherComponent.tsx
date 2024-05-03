import Image from "next/image";
import React, { useEffect, useState } from "react";

interface WeatherComponentProps {
  date: string;
  temperature: number;
  symbolCode: string;
  showHours?: boolean;
  showWeek?: boolean;
}

export default function WeatherComponent({
  date,
  temperature,
  symbolCode,
  showHours,
  showWeek,
}: WeatherComponentProps) {
  const [days, setDays] = useState<string>();
  const [hours, setHours] = useState<number>();

  useEffect(() => {
    if (showWeek) {
      const days = [
        "Søndag",
        "Mandag",
        "Tirsdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lørdag",
      ];
      setDays(days[new Date(date).getDay()]);
    } else if (showHours) {
      setHours(new Date(date).getHours());
    }
  }, [showHours, showWeek]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl text-bold">{days ? days : hours}</h1>
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
