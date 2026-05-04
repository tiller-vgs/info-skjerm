export interface WeatherDay {
  day: string;
  WeatherObjects: WeatherObject[];
}

export interface WeatherObject {
  time: string;
  symbol_code: string;
  air_temperature: number;
  wind_speed: number;
  wind_from_direction: number;
}
