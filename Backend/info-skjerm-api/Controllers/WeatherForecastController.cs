using info_skjerm_api.Model;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

//TODO: 
// - dra ut gjentatt kode til sin egen funksjon

namespace info_skjerm_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    { 
        // Henter værvarsel for i nå og de neste 6 timene
        [HttpGet("Today")]
        public async Task<IActionResult> GetWeatherForecastTodayAsync()
       {
            var apiUrl = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

            using var client = new HttpClient();

            client.DefaultRequestHeaders.Add("User-Agent", "C# console program");

            var response = await client.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStreamAsync();
                var jsonElements = await JsonSerializer.DeserializeAsync<WeatherForecastInfo>(content, JsonSerializerOptions.Default);
                var timeSeries = jsonElements.properties.timeseries;
                
                List<TodayWeatherForcast> todayWeatherForcastList = [];

                for (var i = 0; i < 7; i++)
                {
                    todayWeatherForcastList.Add(new TodayWeatherForcast
                    {
                        airTemperature = timeSeries[i].data.instant.details.air_temperature,
                        symbol_code = timeSeries[i].data.next_1_hours.summary.symbol_code,
                        time = timeSeries[i].time
                    });
                }
                return Ok(todayWeatherForcastList);
            }else
            {
                return BadRequest();
            }
       }

        //Henter værvarsel klokken 12 GMT for de neste dagene i en uke
        [HttpGet("NextDays")]
        public async Task<IActionResult> GetWeatherForecastNextWeekAsync()
        {
            var apiUrl = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

            using var client = new HttpClient();

            client.DefaultRequestHeaders.Add("User-Agent", "C# console program");
            
            var response = await client.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStreamAsync();
                var jsonElements = await JsonSerializer.DeserializeAsync<WeatherForecastInfo>(content, JsonSerializerOptions.Default);
                var timeSeries = jsonElements.properties.timeseries;
                
                var currentDate = int.Parse(jsonElements.properties.timeseries[0].time.Substring(startIndex:8, length:2));
                
                const int noon = 12;
                var dayIndexer = 1;
                
                List<NextDaysWeatherForcast> nextDaysForcastList = [];
                
                //looper igjennom timseries og legger til de riktige dagene og tidspuktet i listen
                foreach (TimeSeries timeSeriesElement in timeSeries)
                {
                    if (dayIndexer == 8)
                    {
                        break;
                    }
                    
                    //koverterer og deler opp en streng til nummer man kan behandle
                    var nextHours = int.Parse(timeSeriesElement.time.Substring(startIndex: 11, length: 2));
                    var nextDate = int.Parse(timeSeriesElement.time.Substring(startIndex: 8, length: 2));
                    
                    if (nextDate != currentDate + dayIndexer || nextHours != noon) continue;
                    
                    nextDaysForcastList.Add(new NextDaysWeatherForcast
                    {
                        airTemperature = timeSeriesElement.data.instant.details.air_temperature,
                        symbol_code = timeSeriesElement.data.next_6_hours.summary.symbol_code,
                        time = timeSeriesElement.time
                    });
                    dayIndexer++;
                }
                return Ok(nextDaysForcastList);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}