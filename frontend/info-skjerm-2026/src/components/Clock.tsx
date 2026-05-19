import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Oppdaterer tiden hvert 1000 millisekund (1 sekund)
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Rydder opp intervallet når komponenten unmountes
    return () => clearInterval(timerId);
  }, []); // Tom avhengighetsarray gjør at effekten kun kjører én gang ved montering

  // Formaterer tiden med timer, minutter og sekunder
  // Options-objektet sikrer tosiffer-formatering for alle tidsenheter
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Bruker 24-timers format
  });

  return (
    <div id="clock">
      <h1 className="text-5xl text-center">{formattedTime}</h1>
    </div>
  );
};

export default Clock;
