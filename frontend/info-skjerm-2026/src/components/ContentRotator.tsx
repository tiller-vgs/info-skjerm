import React, { useState, useEffect, type JSX } from "react";
import BusRouteList from "./BusRouteList";
// import AnnouncementsGrid from "./AnnouncementsGrid";
import TQLeaderboard from "./TQLeaderboard";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const busStops: string[] = ["Tiller VGS.", "City Syd", "Tillerterminalen"];

const StaleTime = 1000 * 60;

export const BusRotator: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const NumberOfBusses = 30;
  const AccualNumberOfBusses = 9;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % busStops.length);
    }, StaleTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-[4vh]">
        <DirectionsBusIcon sx={{ fontSize: "inherit" }} />
        {busStops[index]}
      </h2>

      <BusRouteList
        key={busStops[index]}
        NumberOfBusses={NumberOfBusses}
        AccualNumberOfBusses={AccualNumberOfBusses}
        BusStopName={busStops[index]}
      />
    </div>
  );
};

const announcments: (string | JSX.Element)[] = [
  <TQLeaderboard />,
  <TQLeaderboard />,
];

export const AnnouncmentRotator: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcments.length);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return <div className="h-full w-full">{announcments[index]}</div>;
};
