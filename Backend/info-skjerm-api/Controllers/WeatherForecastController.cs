using System.Text.Json;
using info_skjerm_api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

//TODO:
// - dra ut gjentatt kode til sin egen funksjon

namespace info_skjerm_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(
            IHttpClientFactory httpClientFactory,
            IMemoryCache cache,
            ILogger<WeatherForecastController> logger
        )
        {
            _httpClientFactory = httpClientFactory;
            _cache = cache;
            _logger = logger;
        }

        // Henter værvarsel for i nå og de neste 6 timene
        [HttpGet("Today")]
        public async Task<IActionResult> GetWeatherForecastTodayAsync()
        {
            const string cacheKey = "weather_today";

            // Check cache first
            if (
                _cache.TryGetValue(cacheKey, out List<TodayWeatherForcast>? cachedData)
                && cachedData != null
            )
            {
                _logger.LogInformation("Returning cached weather data for today");
                return Ok(cachedData);
            }

            var apiUrl =
                "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

            using var client = _httpClientFactory.CreateClient("WeatherClient");

            // Reduced retry attempts for faster response
            for (int attempt = 0; attempt < 2; attempt++)
            {
                try
                {
                    _logger.LogInformation(
                        $"Attempting to fetch weather data (attempt {attempt + 1})"
                    );

                    var response = await client.GetAsync(apiUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStreamAsync();
                        var jsonElements =
                            await JsonSerializer.DeserializeAsync<WeatherForecastInfo>(
                                content,
                                JsonSerializerOptions.Default
                            );
                        var timeSeries = jsonElements.properties.timeseries;

                        List<TodayWeatherForcast> todayWeatherForcastList = [];

                        for (var i = 0; i < 7; i++)
                        {
                            todayWeatherForcastList.Add(
                                new TodayWeatherForcast
                                {
                                    airTemperature = timeSeries[i]
                                        .data
                                        .instant
                                        .details
                                        .air_temperature,
                                    symbol_code = timeSeries[i]
                                        .data
                                        .next_1_hours
                                        .summary
                                        .symbol_code,
                                    time = timeSeries[i].time,
                                }
                            );
                        }

                        // Cache for 10 minutes
                        _cache.Set(cacheKey, todayWeatherForcastList, TimeSpan.FromMinutes(10));

                        _logger.LogInformation(
                            "Successfully fetched and cached weather data for today"
                        );
                        return Ok(todayWeatherForcastList);
                    }
                    else
                    {
                        _logger.LogWarning($"Weather API returned {response.StatusCode}");
                    }
                }
                catch (HttpRequestException ex)
                {
                    _logger.LogError(ex, $"HTTP error on attempt {attempt + 1}");
                    if (attempt == 1) // Last attempt
                    {
                        return StatusCode(503, "Weather service temporarily unavailable");
                    }
                    await Task.Delay(500); // Shorter delay for faster response
                }
                catch (TaskCanceledException ex)
                {
                    _logger.LogError(ex, $"Timeout on attempt {attempt + 1}");
                    if (attempt == 1) // Last attempt
                    {
                        return StatusCode(408, "Weather service timeout");
                    }
                    await Task.Delay(500); // Shorter delay
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Unexpected error on attempt {attempt + 1}");
                    if (attempt == 1)
                    {
                        return StatusCode(500, "Internal server error while fetching weather");
                    }
                    await Task.Delay(500);
                }
            }

            return StatusCode(503, "Weather service unavailable");
        }

        //Henter værvarsel klokken 12 GMT for de neste dagene i en uke
        [HttpGet("NextDays")]
        public async Task<IActionResult> GetWeatherForecastNextWeekAsync()
        {
            const string cacheKey = "weather_nextdays";

            // Check cache first
            if (
                _cache.TryGetValue(cacheKey, out List<NextDaysWeatherForcast>? cachedData)
                && cachedData != null
            )
            {
                _logger.LogInformation("Returning cached weather data for next days");
                return Ok(cachedData);
            }

            var apiUrl =
                "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=63.21&lon=10.22";

            using var client = _httpClientFactory.CreateClient("WeatherClient");

            // Reduced retry attempts for faster response
            for (int attempt = 0; attempt < 2; attempt++)
            {
                try
                {
                    _logger.LogInformation(
                        $"Attempting to fetch weather data for next days (attempt {attempt + 1})"
                    );

                    var response = await client.GetAsync(apiUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStreamAsync();
                        var jsonElements =
                            await JsonSerializer.DeserializeAsync<WeatherForecastInfo>(
                                content,
                                JsonSerializerOptions.Default
                            );
                        var timeSeries = jsonElements.properties.timeseries;

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
                            var nextHours = int.Parse(
                                timeSeriesElement.time.Substring(startIndex: 11, length: 2)
                            );
                            if (nextHours != noon)
                                continue;

                            nextDaysForcastList.Add(
                                new NextDaysWeatherForcast
                                {
                                    airTemperature = timeSeriesElement
                                        .data
                                        .instant
                                        .details
                                        .air_temperature,
                                    symbol_code = timeSeriesElement
                                        .data
                                        .next_6_hours
                                        .summary
                                        .symbol_code,
                                    time = timeSeriesElement.time,
                                }
                            );
                            dayIndexer++;
                        }

                        // Cache for 30 minutes (longer since this changes less frequently)
                        _cache.Set(cacheKey, nextDaysForcastList, TimeSpan.FromMinutes(30));

                        _logger.LogInformation(
                            "Successfully fetched and cached weather data for next days"
                        );
                        return Ok(nextDaysForcastList);
                    }
                    else
                    {
                        _logger.LogWarning($"Weather API returned {response.StatusCode}");
                    }
                }
                catch (HttpRequestException ex)
                {
                    _logger.LogError(ex, $"HTTP error on attempt {attempt + 1}");
                    if (attempt == 1) // Last attempt
                    {
                        return StatusCode(503, "Weather service temporarily unavailable");
                    }
                    await Task.Delay(500); // Shorter delay
                }
                catch (TaskCanceledException ex)
                {
                    _logger.LogError(ex, $"Timeout on attempt {attempt + 1}");
                    if (attempt == 1) // Last attempt
                    {
                        return StatusCode(408, "Weather service timeout");
                    }
                    await Task.Delay(500); // Shorter delay
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Unexpected error on attempt {attempt + 1}");
                    if (attempt == 1)
                    {
                        return StatusCode(500, "Internal server error while fetching weather");
                    }
                    await Task.Delay(500);
                }
            }

            return StatusCode(503, "Weather service unavailable");
        }
    }
}
