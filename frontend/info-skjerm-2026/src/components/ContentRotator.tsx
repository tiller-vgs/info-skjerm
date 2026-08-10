import React, { useState, useEffect, type JSX } from "react";
import BusRouteList from "./BusRouteList";
import TQLeaderboard from "./TQLeaderboard";
import CalendarView from "./CalendarView";
import AnnouncementsGrid from "./AnnouncementsGrid";

const busStops: string[] = ["Tiller VGS", "City Syd", "Tillerterminalen"];

const StaleTime = 1000 * 15;

export const BusRotator: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const NumberOfBusses = 30;
  const AccualNumberOfBusses = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % busStops.length);
    }, StaleTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full min-h-0">
      <BusRouteList
        key={busStops[index]}
        NumberOfBusses={NumberOfBusses}
        AccualNumberOfBusses={AccualNumberOfBusses}
        BusStopName={busStops[index]}
      />
    </div>
  );
};

const announcements: (string | JSX.Element)[] = [
  <AnnouncementsGrid />,
  <CalendarView />,
  <TQLeaderboard />,
  <CalendarView />,
];

export const AnnouncementRotator: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 12000); // in milliseconds (12 seconds)

    return () => clearInterval(interval);
  }, []);

  return <div className="h-full w-full">{announcements[index]}</div>;
};
