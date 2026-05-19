// import { useWeatherFetch } from "../hooks/useWeather";
// import type { WeatherDay, WeatherObject } from "../types/types";

function WeatherDisplay() {
  // const {data, error} = useWeatherFetch();
  //   if (data === 'isLoading') {
  //   return <span>Loading...</span>
  // }
  // if (data === 'error') {
  //   return <span>Error: {error.message}</span>
  // }
  // return (
  //   <div className="flex flex-row">
  //     {data?.slice(0, 2).map((day: WeatherDay, i: number) => (
  //       <div
  //         key={i}
  //         className="rounded-xl border-5 border-tkyellow p-2 text-center m-2 inline-block"
  //       >
  //         <p className="text-4xl">{day.day}</p>
  //         <div className="flex gap-2 mt-2 justify-center">
  //           {day.WeatherObjects.map(
  //             (weatherPeriod: WeatherObject, j: number) => (
  //               <div key={j} className="p-2 w-32 h-32">
  //                 {weatherPeriod.time}
  //               </div>
  //             ),
  //           )}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default WeatherDisplay;
