import { useQuery } from "@tanstack/react-query";
import type { BusStop } from "@types";

export const useBus = (_BusStopName: string, _NumberOfBusses: number) => {
  // print("_BusStopName_", _BusStopName, _BusStopName.replace(" ", "%20"), _NumberOfBusses)
  return useQuery({
    queryKey: ["BusStopsBothWays", _BusStopName],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/busdepartures?BusStop=${_BusStopName.replace(" ", "%20")}&num=${_NumberOfBusses.toString()}`,
      );
      if (response.statusText !== "OK") {
        console.log(response.status, response.statusText);
        return response.statusText;
      }
      const BusStop = (await response.json()) as BusStop;
      return BusStop;
    },
  });
};
