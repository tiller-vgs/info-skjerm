namespace info_skjerm_api.Model
{
    public class WeatherForecastInfo
    {
        public Properties properties { get; set; }
    }

    public class Properties
    {
        public List<TimeSeries> timeseries { get; set; }
    }

    public class TimeSeries
    {
        public string time { get; set; }
        public Data data { get; set; }
    }
    public class Data
    {
        public Instant instant { get; set; }

        public
    }

    public class Instant
    {
        public Details details { get; set; }
    }
    public class Details
    {
        public float air_temperature { get; set; }
    }
}