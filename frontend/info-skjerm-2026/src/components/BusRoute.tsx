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
  } // If the bus arrives in less than 10 minutes, simplify the time to minutes remaining
  else if (new Date(RouteData.time) <= new Date(Date.now() + 20 * 60 * 1000)) {
    const minutesRemaining = Math.round(
      (new Date(RouteData.time).getTime() - Date.now()) / (60 * 1000),
    );
    time = `${minutesRemaining} min`;
    textColor = "text-yellow-500";
  }

  return (
    <div className="bg-tqboxes  text-white rounded-xl px-3 py-2 flex items-center justify-between border border-tkyellowdimmed">
      <div className="flex items-center gap-2 min-w-0">
        {/* Buss number */}
        <div className="bg-tkyellow text-black h-8 min-w-10.5 px-2 rounded-lg flex items-center justify-center font-bold text-sm">
          <DirectionsBusIcon />
          {RouteData.busLine}
        </div>
        {/* Buss navn */}
        <p className="font-medium text-sm truncate pr-2">
          {RouteData.destination}
        </p>
      </div>
      {/* Når den ankommer */}
      <p className={`text-lg font-bold ${textColor}`}>{time}</p>
    </div>
  );
}

export default BusRoute;
