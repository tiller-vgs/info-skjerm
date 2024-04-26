"use client";
import { useEffect, useState } from "react";

export default function DateTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = date.toLocaleDateString("no-BK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("no-BK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="border-2 border-white  rounded-lg w-44 h-20">
      <h1 className="text-2xl font-bold text-center p-2">
        {formattedDate} {formattedTime}
      </h1>
    </div>
  );
}
