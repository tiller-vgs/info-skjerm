// import { useQuery } from "@tanstack/react-query";
// import type { WeatherDay } from "../types/types";

// export const useWeatherFetch = () => {

//   return useQuery({
//     queryKey: ["weatherList"],
//     queryFn: async () => {
//       const response = await fetch(
//         "http://localhost:3001/weather"
//       );
//       return response.json();
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// };