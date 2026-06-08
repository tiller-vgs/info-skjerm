import { useQuery } from "@tanstack/react-query";

export const useBus = (busStopName: string, numberOfBusses: number) => {
  return useQuery({
    queryKey: ["BusStopsBothWays", busStopName],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/busdepartures?BusStop=${busStopName}&num=${numberOfBusses}`,
      );
      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 60, // 1 min
  });
};
