import type { BusRouteType } from "@types";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

function BusRoute({ RouteData }: { RouteData: BusRouteType }) {
  // console.log(RouteData);

  const time = new Date(RouteData.time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="bg-tqboxes  text-white rounded-xl px-3 py-2 flex items-center justify-between border border-tkyellowdimmed">
      <div className="flex items-center gap-2 min-w-0">
        {/* Buss number */}
        <div className="bg-tkyellow text-black h-8 min-w-10.5 px-2 rounded-lg flex items-center justify-center font-bold text-sm">
          {RouteData.busLine}
          <DirectionsBusIcon />
        </div>
        {/* Buss navn */}
        <p className="font-medium text-sm truncate pr-2">
          {RouteData.destination}
        </p>
      </div>
      {/* Når den ankommer */}
      <p className="text-lg font-bold">{time}</p>
    </div>
  );
}

export default BusRoute;
