import { useQuery } from "@tanstack/react-query";
// import type { WeatherDay } from "../types/types";
import type { BusStop } from "../types/BusDepartureJsonResponse";

export const useBus = (_BusStopName: string) => {
  return useQuery({
    queryKey: ["BusStopsBotWays"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/busdepartures`);

      return response.json() as Promise<BusStop>;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
