import { useQuery } from "@tanstack/react-query";
// import type { WeatherDay } from "../types/types";
import type { BusStop } from "@types";

export const BusFetch = (BusStopName: string) => {

  return useQuery({
    queryKey: ["BusStopsBotWays"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3001/api/busdepatures", 
      );
      return await response.json() as BusStop;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};