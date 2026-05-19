import { useQuery } from "@tanstack/react-query";
import type { DayOfWeatherObjects } from "@types";

const StaleTime = 1000 * 60 * 60 * 4; // 4 timer
export const getWeather = (DayAmount: number) => {
	return useQuery({
		queryKey: ["weather", DayAmount],
		queryFn: async () => {
			const response = await fetch(`http://localhost:3001/api/weather?DayAmount=${DayAmount}`);
			const DayOfWeatherObjectList = (await response.json()) as DayOfWeatherObjects[];
			return DayOfWeatherObjectList;
		},
		staleTime: StaleTime,
	});
};
