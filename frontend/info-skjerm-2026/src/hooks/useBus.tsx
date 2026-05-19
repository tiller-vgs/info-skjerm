import { useQuery } from "@tanstack/react-query";
import type { BusStop } from "@types";
import { print } from "../../../../Backend/src/utils/index.ts"

export const StaleTime = 1000 * 6// 0 * 5; // 5 minutes

export const useBus = (_BusStopName: string, _NumberOfBusses: number) => {
  print("_BusStopName_", _BusStopName, _BusStopName.replace(" ", "%20"), _NumberOfBusses)
  // console.log(`Fetching bus data for ${_BusStopName} with ${_NumberOfBusses} busses...`);
  return useQuery({
    queryKey: ["BusStopsBothWays", _BusStopName],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/api/busdepartures?BusStop=${_BusStopName.replace(" ", "%20")}&num=${_NumberOfBusses.toString()}`);
      const BusStop = (await response.json()) as BusStop;
      print("BusStop", BusStop);
      return BusStop;
    },
    // staleTime: StaleTime,
  });
};
