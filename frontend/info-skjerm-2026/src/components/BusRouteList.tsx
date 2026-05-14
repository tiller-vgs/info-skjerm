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
      <div>
        <p>Northbound</p>
        {busData.northBound.map((bus) => {
          return <BusRoute RouteData={bus} />;
        })}
      </div>

      <div>
        <p>Southbound</p>
        {busData.southBound.map((bus) => {
          return <BusRoute RouteData={bus} />;
        })}
      </div>
    </>
  );
}
export default BusRouteList;
