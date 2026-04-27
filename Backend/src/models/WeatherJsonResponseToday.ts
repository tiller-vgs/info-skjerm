export interface WeatherJsonResponseToday {
  todayForcastList: TodayWeatherForcast[];
}

export interface TodayWeatherForcast {
  airTemperature: number;
  symbol_code: string;
  time: string;
}
