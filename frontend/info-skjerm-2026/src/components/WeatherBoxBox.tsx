import { useWeather } from "../hooks/useWeather"
import WeatherBox from "./WeatherBox";

function WeatherBoxBox() {
    const Weather = useWeather(3)

    const Weather2 = Weather.data;
    if (typeof Weather2 == "string") {
        return Weather2;
    } else if (!Weather2) {
        return
	}
    

    return (
        <>
            {Weather2.map((DayOfWeatherObjects) => {
                return (<div>
                    <p>{DayOfWeatherObjects.date + " | " + DayOfWeatherObjects.day}</p>
                    {DayOfWeatherObjects.FrontendWeatherObject.map((FrontendWeatherObject) => {
                        return <WeatherBox FrontendWeatherObject={FrontendWeatherObject} />;
                    })}
                </div>)
            })}
        </>
  )
}
export default WeatherBoxBox