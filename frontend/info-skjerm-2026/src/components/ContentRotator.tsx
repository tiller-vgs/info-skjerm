import React, { useState, useEffect } from "react";
const busStops: string[] = ["Tiller VGS", "Tillerterminalen", "City Syd"];

export const BusRotator: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % busStops.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>{busStops[index]}</h2>
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

  return (
    <div>
      <h2>{announcments[index]}</h2>
    </div>
  );
};

// export function AnnouncementRotator() {
//   return <div>t</div>;
// }
