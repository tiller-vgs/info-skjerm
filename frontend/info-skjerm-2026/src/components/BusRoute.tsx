import type { BusRouteType } from "@types";

function BusRoute({ RouteData }: { RouteData: BusRouteType }) {
  console.log(RouteData);

  const time = new Date(RouteData.time).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

  return <div>
    Bus: {RouteData.busLine} - {RouteData.destination}<br/>
    Time: {time}<br/>
    </div>;
}

export default BusRoute;
