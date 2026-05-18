import React, { useState, useEffect } from "react";
import BusRouteList from "./BusRouteList";
import { StaleTime } from "../hooks/useBus";

const busStops: string[] = [
  "Tiller VGS.",
  "City Syd",
  "Tillerterminalen",
];

export const BusRotator: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const NumberOfBusses = 30;
  const AccualNumberOfBusses = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % busStops.length);
    }, StaleTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>{busStops[index]}</h2>

      <BusRouteList
        key={busStops[index]}
        NumberOfBusses={NumberOfBusses}
        AccualNumberOfBusses={AccualNumberOfBusses}
        BusStopName={busStops[index]}
      />
    </div>
  );
};

const announcments: string[] = ["Announcments", "TillerQuest"];

export const AnnouncmentRotator: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcments.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div className="h-full w-full">{announcments[index]}</div>;
};
