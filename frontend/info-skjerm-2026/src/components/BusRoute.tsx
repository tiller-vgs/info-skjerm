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
        <div className="bg-tkyellow text-black h-fit min-w-[3vw] px-2 rounded-lg flex items-center justify-center font-bold text-[2vh]">
          <DirectionsBusIcon />
          {RouteData.busLine}
        </div>
        {/* Buss navn */}
        <p className="font-medium text-[2vh] truncate pr-2">
          {RouteData.destination}
        </p>
      </div>
      {/* Når den ankommer */}
      <p className="text-[2vh] font-bold">{time}</p>
    </div>
  );
}

export default BusRoute;
