using System.Text.Json;
using info_skjerm_api.Model;
using Microsoft.AspNetCore.Mvc;

namespace info_skjerm_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        [HttpGet("weatherforecast")]
        public async Task<IActionResult> GetWeatherForecastAsync()
        {
            var apiUrl = "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

            using HttpClient client = new HttpClient();

            client.DefaultRequestHeaders.Add("User-Agent", "C# console program");

            var response = await client.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStreamAsync();
                var jsonElements = await JsonSerializer.DeserializeAsync<WeatherForecastInfo>(content, JsonSerializerOptions.Default);
                var presentTimeData = jsonElements.properties.timeseries[0].data;
                

                WeatherJsonResponse weatherJsonResponse = new WeatherJsonResponse();

                weatherJsonResponse.airTemperature = presentTimeData.instant.details.air_temperature;
                weatherJsonResponse.symbol_code = presentTimeData.next_1_hours.summary.symbol_code;

                return Ok(weatherJsonResponse);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }
    }
}