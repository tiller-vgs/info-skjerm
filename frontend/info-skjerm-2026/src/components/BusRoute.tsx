import type { BusRouteType } from "@types";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

function BusRoute({ RouteData }: { RouteData: BusRouteType }) {
  // console.log(RouteData);

  let time = new Date(RouteData.time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  let textColor = "text-white";

  // If the bus arrives in less than a minute, simplify the time display to "Arriving soon"
  if (new Date(RouteData.time) <= new Date(Date.now() + 60 * 1000)) {
    time = "Nå";
    textColor = "text-yellow-500";
  } // If the bus arrives in less than 15 minutes, simplify the time to minutes remaining
  else if (new Date(RouteData.time) <= new Date(Date.now() + 15 * 60 * 1000)) {
    const minutesRemaining = Math.round(
      (new Date(RouteData.time).getTime() - Date.now()) / (60 * 1000),
    );
    time = `${minutesRemaining} min`;
    textColor = "text-yellow-500";
  }

  return (
    <div className="bg-tqboxes text-white rounded-xl px-3.5 py-2.5 flex items-center justify-between border border-tkyellowdimmed my-1 3xl:my-2 gap-3 min-w-0">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {/* Buss number */}
        <div className="bg-tkyellow text-black text-lg 3xl:text-5xl h-fit min-w-[2.5em] py-0.5 3xl:py-3 rounded-lg flex items-center justify-center font-bold">
          <DirectionsBusIcon sx={{ fontSize: "inherit" }} />
          {RouteData.busLine}
        </div>
        {/* Buss navn */}
        <p className="font-medium text-lg 3xl:text-4xl truncate pr-1 leading-tight min-w-0">
          {RouteData.destination}
        </p>
      </div>
      {/* Når den ankommer */}
      <p className={`font-bold text-lg 3xl:text-5xl ${textColor}`}>{time}</p>
    </div>
  );
}

export default BusRoute;
