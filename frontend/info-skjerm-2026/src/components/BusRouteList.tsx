import type { BusStop } from "@types";
import { useBus } from "../hooks/useBus";
import BusRoute from "./BusRoute";
import { print } from "../../../../Backend/src/utils/index.ts"

function BusRouteList({ BusStopName, NumberOfBusses, AccualNumberOfBusses }: { BusStopName: string, NumberOfBusses: number, AccualNumberOfBusses: number }) {
  const BusResponse = useBus(BusStopName, NumberOfBusses);

  const error = BusResponse.error;
  const isLoading = BusResponse.isLoading;
  let busData: BusStop = {} as BusStop;
  const directions: Array<keyof BusStop> = ["northBound", "southBound"]
  try {
    print("BusResponse.data", BusStopName, BusResponse, "----------", BusResponse.data)
    // const data = BusResponse.data[0]
    busData = BusResponse.data![0];
  } catch (err) {
    console.log("Error accessing bus data", err);
    return <div key={"tryerror"}>No bus data available</div>;
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

  // const directions: Array<keyof BusStop> = ["northBound", "southBound"]
  return (
    <>
      {directions.map((direction) =>      
        <div className="bg-tqbackground rounded-2xl shadow-2xl p-3 mt-5 border border-zinc-800" key={"direction" + direction}>
          <p className="text-tqwhitetext text-sm mb-2">{direction.slice(0, 1) + direction.slice(1, direction.length)}</p>

          <div
            className="space-y-1.5 max-h-68 overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
          {
            busData[direction].slice(0, AccualNumberOfBusses).map((bus) => (
              <BusRoute key={bus.time + bus.busLine} RouteData={bus} />
            ))
          }
        </div>
      </div>
      )}
    </>
  );
}
export default BusRouteList;
