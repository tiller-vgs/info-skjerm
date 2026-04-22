import { useState, useEffect } from "react";

const Clock = () => {
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
      <h1 className="text-xxl ">{formattedTime}</h1>
    </div>
  );
};

export default Clock;
