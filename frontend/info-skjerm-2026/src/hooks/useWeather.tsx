import { useQuery } from "@tanstack/react-query";
import type { DayOfWeatherObjects } from "@types";

const StaleTime = 1000 * 60 * 60 * 4; // 4 timer
export const useWeather = (DayAmount: number) => {
	return useQuery({
		queryKey: ["weather", DayAmount],
		queryFn: async () => {
            const response = await fetch(`http://localhost:3001/api/weather?DayAmount=${DayAmount}`);
      		if (response.statusText !== "OK") {
				console.log(response.status, response.statusText);
				return response.statusText;
			}
			const DayOfWeatherObjectList = (await response.json()) as DayOfWeatherObjects[];
			return DayOfWeatherObjectList;
		},
		staleTime: StaleTime,
	});
};
