namespace info_skjerm_api.Model

//LYKKE TIL :-) HILSEN J�RGEN 
{
    public struct WeatherForecastInfo
    {
        public Properties properties { get; set; }
    }

    public struct Properties
    {
        public List<TimeSeries> timeseries { get; set; }
    }

    public struct TimeSeries
    {
        public string time { get; set; }
        public Data data { get; set; }
    }

    public struct Data
    {
        public Instant instant { get; set; }

        public Next_1_Hours next_1_hours { get; set; }
    }

    public struct Instant
    {
        public Details details { get; set; }
    }

    public struct Details
    {
        public float air_temperature { get; set; }
    }

    public struct Next_1_Hours
    {
       public Summary summary { get; set; }
    }

    public struct Summary
    {
        public string symbol_code { get; set; }
    }
}