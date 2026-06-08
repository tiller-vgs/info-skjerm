import type { BusStop } from "@types";
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
  busData = data! as BusStop;

  if (isError) {
    return (
      <div className="text-[2vh]" key={"error"}>
        Error fetching bus data
      </div>
    );
  }

  if (isLoading || isPending) {
    return (
      <div className="text-[2vh]" key={"isLoading"}>
        Loading bus data...
      </div>
    );
  }

  if (!busData) {
    return <div className="text-[2vh]">No bus data available</div>;
  }

  return (
    <>
      {/* Map viser begge borderne rundt bussene som ankommer */}
      {directions.map((direction, index) => {
        return (
          <div
            className="bg-tqbackground  rounded-2xl shadow-2xl p-3 mt-5 border border-zinc-800"
            key={"direction" + direction}
          >
            <p className="text-tqwhitetext text-[2vh] mb-2">
              Retning {index + 1}
            </p>

            <div className="space-y-1.5">
              {busData[direction].slice(0, AccualNumberOfBusses).map((bus) => (
                <BusRoute key={bus.time + bus.busLine} RouteData={bus} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
export default BusRouteList;
