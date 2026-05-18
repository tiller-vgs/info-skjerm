import type { BusRouteType } from "@types";

function BusRoute({ RouteData }: { RouteData: BusRouteType }) {
  console.log(RouteData);

  const time = new Date(RouteData.time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="bg-tqboxes text-white rounded-xl px-3 py-2 flex items-center justify-between border border-zinc-800">
      {/* Venstre */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Linjenummer */}
        <div className="bg-tkyellow text-black h-8 min-w-10.5 px-2 rounded-lg flex items-center justify-center font-bold text-sm">
          {RouteData.busLine}
        </div>

        {/* Destinasjon */}
        <p className="font-medium text-sm truncate">{RouteData.destination}</p>
      </div>

      {/* Tid */}
      <p className="text-lg font-bold">{time}</p>
    </div>
  );
}

export default BusRoute;
