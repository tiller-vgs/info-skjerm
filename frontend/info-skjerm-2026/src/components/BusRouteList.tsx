import type { BusStop } from "@types";
import { useBus } from "../hooks/useBus";
import BusRoute from "./BusRoute";

function BusRouteList({ BusStopName, NumberOfBusses, AccualNumberOfBusses }: { BusStopName: string, NumberOfBusses: number, AccualNumberOfBusses: number }) {
  const BusResponse = useBus(BusStopName, NumberOfBusses);

  const error = BusResponse.error;
  const isLoading = BusResponse.isLoading;
  let busData: BusStop = {} as BusStop;
  const directions: Array<keyof BusStop> = ["northBound", "southBound"]
  try {
    const data = BusResponse.data!;;
    if (typeof data == "string") {
      return <p>{data}</p>;
    }
    busData = BusResponse.data! as BusStop;
  } catch (err) {
    console.log("Error accessing bus data", err);
    return <div key={"tryerror"}>Error accessing bus data</div>;
  }

  if (error) {
    return <div key={"error"}>Error fetching bus data</div>;
  }

  if (isLoading) {
    return <div key={"isLoading"}>Loading bus data...</div>;
  }

  if (!busData) {
    return <div>No bus data available</div>;
  }

  return (
    <>
    {/* Map viser begge borderne rundt bussene som ankommer */}
      {directions.map((direction, index) => {
        return (
          <div className="bg-tqbackground  rounded-2xl shadow-2xl p-3 mt-5 border border-zinc-800" key={"direction" + direction}>
            <p className="text-tqwhitetext text-sm mb-2">Retning {index + 1}</p>

            <div
              className="space-y-1.5"
            >
              {
                busData[direction].slice(0, AccualNumberOfBusses).map((bus) => (
                  <BusRoute key={bus.time + bus.busLine} RouteData={bus} />
                ))
              }
            </div>
          </div>
        )
      }
      )}
    </>
  );
}
export default BusRouteList;
