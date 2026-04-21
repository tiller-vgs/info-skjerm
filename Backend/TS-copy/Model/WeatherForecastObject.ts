export interface WeatherForecastInfo {
  properties: Properties;
}

export interface Properties {
  timeseries: TimeSeries[];
}

export interface TimeSeries {
  time: string;
  data: Data;
}

export interface Data {
  instant: Instant;
  next_1_hours: Next_1_Hours;
  next_6_hours: Next_6_Hours;
}

export interface Instant {
  details: Details;
}

export interface Details {
  air_temperature: number;
}

export interface Next_1_Hours {
  summary: Summary;
}

export interface Next_6_Hours {
  summary: Summary;
}

export interface Summary {
  symbol_code: string;
}
