namespace info_skjerm_api.Model
{
    public class WeatherJsonResponseToday
    {
        public List<TodayWeatherForcast> todayForcastList { get; set; } = new();
    }

    public class TodayWeatherForcast
    {
        public float airTemperature { get; set; }

        public string symbol_code { get; set; }

        public string time { get; set; }
    }
}