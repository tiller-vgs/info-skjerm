import React, { useState, useEffect } from "react";

const ClockDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time state every 1000 milliseconds (1 second)
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Format the time to include hours, minutes, and seconds
  // The options object ensures two-digit formatting for all time units
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  });

  return (
    <div id="clock">
      <h1 className="text-5xl text-center">{formattedTime}</h1>
    </div>
  );
};

function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

const DateAndTimeDisplay: React.FC = () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const week = getWeekNumber(now);

  return (
    <div className="flex align-middle justify-around p-2">
      
      <h1 className="text-center text-5xl">
        {dd}.{mm}.{yy}
      </h1>
      <h1 className="text-center text-5xl">Uke {week}</h1>
      <ClockDisplay />
    </div>
  );
};

export default DateAndTimeDisplay;