/*
This file is for all endpoints for bus routes
For other endpoints, create new controllers
The route for these endpoints are {baseurl}/BusTimes/{endpoint}

Authored by @Marcus-Aastum
*/

using System.Globalization;
using System.Text;
using System.Text.Json;
using info_skjerm_api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using Microsoft.Extensions.Caching.Memory;

namespace info_skjerm_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BusTimesController : ControllerBase
    {
        //Defines context for database
        private readonly ApplicationDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;
        private readonly ILogger<BusTimesController> _logger;

        public BusTimesController(
            ApplicationDbContext context,
            IHttpClientFactory httpClientFactory,
            IMemoryCache cache,
            ILogger<BusTimesController> logger
        )
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
            _cache = cache;
            _logger = logger;
        }

        //This endpoint returns bus departures, with an optional property "num" which defines how many buses to be returned (default 20)
        [HttpGet("departures")]
        [ProducesResponseType(typeof(BusStop), 200)]
        public async Task<IActionResult> GetDeparture(int num = 20)
        {
            var cacheKey = $"bus_departures_{num}";

            // Check cache first - bus data changes more frequently, so shorter cache time
            if (_cache.TryGetValue(cacheKey, out BusStop? cachedData) && cachedData != null)
            {
                _logger.LogInformation($"Returning cached bus departure data for {num} departures");
                return Ok(cachedData);
            }

            //Defines a request object with url and graphql-query
            var request = new HttpRequestMessage(
                HttpMethod.Post,
                "https://api.entur.io/journey-planner/v3/graphql"
            );
            var query =
                """{"query": "{ stopPlace( id: \"NSR:StopPlace:44029\" ) { id name estimatedCalls( numberOfDepartures: """
                + num.ToString()
                + """ ) { realtime aimedArrivalTime expectedArrivalTime destinationDisplay { frontText } quay { id } serviceJourney { journeyPattern { line { id name transportMode } } } } }}"}""";

            //Sends the request and converts response into a "Businfo" object
            using var httpClient = _httpClientFactory.CreateClient("BusClient");
            request.Content = new StringContent(query, Encoding.UTF8, "application/json");

            // Reduced retry attempts for faster response
            for (int attempt = 0; attempt < 2; attempt++)
            {
                try
                {
                    _logger.LogInformation(
                        $"Attempting to fetch bus departure data (attempt {attempt + 1})"
                    );

                    var response = await httpClient.SendAsync(request);

                    if (response.IsSuccessStatusCode)
                    {
                        var responseContent = await response.Content.ReadAsStreamAsync();
                        var jsonResponse = await JsonSerializer.DeserializeAsync<Businfo>(
                            responseContent
                        );

                        List<BusRoute> northBound = [];
                        List<BusRoute> southBound = [];
                        List<BusRoute> all = [];

                        //Iterates through every bus departure
                        for (int i = 0; i < jsonResponse.data.stopPlace.estimatedCalls.Count; i++)
                        {
                            //Assigns the departure to a "BusRoute"-object, and adds it to a list of all bus departures
                            BusRoute busRoute = new BusRoute();
                            busRoute.destination = jsonResponse
                                .data
                                .stopPlace
                                .estimatedCalls[i]
                                .destinationDisplay
                                .frontText;
                            busRoute.time = jsonResponse
                                .data
                                .stopPlace
                                .estimatedCalls[i]
                                .expectedArrivalTime;
                            busRoute.isRealTime = jsonResponse
                                .data
                                .stopPlace
                                .estimatedCalls[i]
                                .realtime;
                            busRoute.busLine = Int32.Parse(
                                jsonResponse
                                    .data.stopPlace.estimatedCalls[i]
                                    .serviceJourney.journeyPattern.line.id.Split(":")[2]
                                    .Split("_")[1]
                            );
                            all.Add(busRoute);

                            //Puts the object in the northbound or southbound list based on what "quay" it leaves from
                            if (
                                jsonResponse.data.stopPlace.estimatedCalls[i].quay.id
                                == "NSR:Quay:75606"
                            )
                            {
                                northBound.Add(busRoute);
                            }
                            else if (
                                jsonResponse.data.stopPlace.estimatedCalls[i].quay.id
                                == "NSR:Quay:75607"
                            )
                            {
                                southBound.Add(busRoute);
                            }
                        }
                        //Creates a "BusStop"-object and returns this
                        BusStop busStop = new BusStop();
                        busStop.northBound = northBound;
                        busStop.southBound = southBound;
                        busStop.all = all;

                        // Cache for 2 minutes (bus times change frequently)
                        _cache.Set(cacheKey, busStop, TimeSpan.FromMinutes(2));

                        _logger.LogInformation(
                            "Successfully fetched and cached bus departure data"
                        );
                        return Ok(busStop);
                    }
                    else
                    {
                        _logger.LogWarning($"Bus API returned {response.StatusCode}");
                    }
                }
                catch (HttpRequestException ex)
                {
                    _logger.LogError(ex, $"HTTP error on attempt {attempt + 1}");
                    if (attempt == 1) // Last attempt
                    {
                        return StatusCode(503, "Bus service temporarily unavailable");
                    }
                    await Task.Delay(500); // Shorter delay for faster response
                }
                catch (TaskCanceledException ex)
                {
                    _logger.LogError(ex, $"Timeout on attempt {attempt + 1}");
                    if (attempt == 1) // Last attempt
                    {
                        return StatusCode(408, "Bus service timeout");
                    }
                    await Task.Delay(500); // Shorter delay
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Unexpected error on attempt {attempt + 1}");
                    if (attempt == 1)
                    {
                        return StatusCode(500, "Internal server error while fetching bus data");
                    }
                    await Task.Delay(500);
                }
            }

            return StatusCode(503, "Bus service unavailable");
        }

        //This file is only for endpoints relating to bus routes.
    }
}
