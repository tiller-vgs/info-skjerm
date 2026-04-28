export interface WeatherJsonResponseNextDays {
  nextDaysForcastList: NextDaysWeatherForcast[];
}

export interface NextDaysWeatherForcast {
  airTemperature: number;
  symbol_code: string;
  time: string;
}
