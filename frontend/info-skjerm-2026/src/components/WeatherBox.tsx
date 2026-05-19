import type { FrontendWeatherObject } from "@types"

function WeatherBox({FrontendWeatherObject}: {FrontendWeatherObject: FrontendWeatherObject}) {
  return (
		<div>
			<p>{FrontendWeatherObject.time}</p>
			<div>
				<p>{FrontendWeatherObject.air_temperature}</p>
				<p>{FrontendWeatherObject.wind_speed}</p>
				<p>{FrontendWeatherObject.wind_from_direction}</p>
			</div>
			<div>{FrontendWeatherObject.symbol_code}</div>
		</div>
	);
}
export default WeatherBox