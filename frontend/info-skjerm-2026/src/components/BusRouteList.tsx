import { useBus } from "../hooks/useBus";
import BusRoute from "./BusRoute";

function BusRouteList({ BusStopName }: { BusStopName: string }) {
  const BusResponse = useBus(BusStopName);

  const busData = BusResponse.data;
  const error = BusResponse.error;
  const isLoading = BusResponse.isLoading;

  if (error) {
    return <div>Error fetching bus data</div>;
  }

  if (isLoading) {
    return <div>Loading bus data...</div>;
  }

  if (!busData) {
    return <div>No bus data available</div>;
  }

  return (
    <>
      <div className="bg-tqbackground rounded-2xl shadow-2xl p-3 mt-5 border border-zinc-800">
        <p className="text-tqwhitetext text-sm mb-2">Northbound</p>

        <div
          className="space-y-1.5 max-h-68 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {busData.northBound.map((bus) => {
            return <BusRoute RouteData={bus} />;
          })}
        </div>
      </div>

      <div className="bg-tqbackground rounded-2xl p-3 mt-5 border border-zinc-800">
        <p className="text-tqwhitetext text-sm mb-2">Southbound</p>

        <div
          className="space-y-1.5 max-h-68 overflow-y-scroll "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {busData.southBound.map((bus) => {
            return <BusRoute RouteData={bus} />;
          })}
        </div>
      </div>
    </>
  );
}
export default BusRouteList;
