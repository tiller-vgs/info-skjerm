export interface DayOfWeatherObjects {
  day: string;
  FrontendWeatherObject: FrontendWeatherObject[];
}

export interface FrontendWeatherObject {
  time: string;
  symbol_code: string;
  air_temperature: number;
  wind_speed: number;
  wind_from_direction: number;
}