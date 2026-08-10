import type { BusStop } from "@types";
import PlaceIcon from "@mui/icons-material/Place";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useBus } from "../hooks/useBus";
import BusRoute from "./BusRoute";

function BusRouteList({
  BusStopName,
  NumberOfBusses,
  AccualNumberOfBusses,
}: {
  BusStopName: string;
  NumberOfBusses: number;
  AccualNumberOfBusses: number;
}) {
  const { data, isError, isLoading, isPending } = useBus(
    BusStopName.replace(" ", "%20"),
    NumberOfBusses,
  );
  let busData: BusStop = {} as BusStop;
  const directions: Array<keyof BusStop> = ["northBound", "southBound"];
  const directionIcons: Record<keyof BusStop, typeof NorthIcon> = {
    northBound: NorthIcon,
    southBound: SouthIcon,
  };
  busData = data! as BusStop;

  if (isError) {
    return (
      <div className="text-[clamp(1.2rem,2.6vh,2.4rem)]" key={"error"}>
        Error fetching bus data
      </div>
    );
  }

  if (isLoading || isPending) {
    return (
      <div className="text-[clamp(1.2rem,2.6vh,2.4rem)]" key={"isLoading"}>
        Loading bus data...
      </div>
    );
  }

  if (!busData) {
    return (
      <div className="text-[clamp(1.2rem,2.6vh,2.4rem)]">
        No bus data available
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 flex flex-col gap-3 overflow-hidden">
      {/* Keep each direction box bounded and scroll only inside the list area */}
      {directions.map((direction) => {
        const DirectionIcon = directionIcons[direction];

        return (
          <div
            className="bg-tqbackground rounded-2xl shadow-2xl p-3.5 border border-zinc-800 flex flex-col flex-1 min-h-0"
            key={"direction" + direction}
          >
            <div className="text-tqwhitetext mb-2.5 flex items-center justify-between gap-2.5 min-w-0">
              <p className="text-[clamp(1.35rem,3vh,3.1rem)] font-semibold flex items-center gap-2 min-w-0 truncate leading-tight">
                <PlaceIcon sx={{ fontSize: "inherit" }} />
                {BusStopName}{" "}
                <p className="text-sm mt-2 3xl:mt-5 3xl:text-2xl text-tkyellow font-semibold">
                  {direction === "northBound" ? "Nordgående" : "Sørgående"}
                </p>
              </p>
              <DirectionIcon sx={{ fontSize: "clamp(1.35rem,3vh,3.1rem)" }} />
            </div>

            <div className="flex-1 min-h-0 pr-1.5">
              {busData[direction].slice(0, AccualNumberOfBusses).map((bus) => (
                <BusRoute key={bus.time + bus.busLine} RouteData={bus} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default BusRouteList;
