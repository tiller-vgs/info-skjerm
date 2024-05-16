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

namespace info_skjerm_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BusTimesController : ControllerBase
    {
        //Defines context for database
        private readonly ApplicationDbContext _context;
        public BusTimesController(ApplicationDbContext context) {
            _context = context;
        }

        //This endpoint returns bus departures, with an optional property "num" which defines how many buses to be returned (default 20)
        [HttpGet("departures")]
        [ProducesResponseType(typeof(BusStop), 200)]
        public async Task<IActionResult> GetDeparture(int num = 20)
        {
            //Defines a request object with url and graphql-query
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.entur.io/journey-planner/v3/graphql");
            var query = """{"query": "{ stopPlace( id: \"NSR:StopPlace:44029\" ) { id name estimatedCalls( numberOfDepartures: """ + num.ToString() + """ ) { realtime aimedArrivalTime expectedArrivalTime destinationDisplay { frontText } quay { id } serviceJourney { journeyPattern { line { id name transportMode } } } } }}"}""";

            
            //Sends the request and converts response into a "Businfo" object
            HttpClient httpClient = new HttpClient();
            request.Headers.Add("ET-Client-Name", "tillervgs-infoskjerm");
            request.Content = new StringContent(query, Encoding.UTF8, "application/json");
            var response = await httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStreamAsync();
            var jsonResponse = await JsonSerializer.DeserializeAsync<Businfo>(responseContent);

            List<BusRoute> northBound = [];
            List<BusRoute> southBound = [];
            List<BusRoute> all = [];

            //Iterates through every bus departure
            for (int i = 0; i < jsonResponse.data.stopPlace.estimatedCalls.Count; i++)
            {
                //Assigns the departure to a "BusRoute"-object, and adds it to a list of all bus departures
                BusRoute busRoute = new BusRoute();
                busRoute.destination = jsonResponse.data.stopPlace.estimatedCalls[i].destinationDisplay.frontText;
                busRoute.time = jsonResponse.data.stopPlace.estimatedCalls[i].expectedArrivalTime;
                busRoute.isRealTime = jsonResponse.data.stopPlace.estimatedCalls[i].realtime;
                busRoute.busLine = Int32.Parse(jsonResponse.data.stopPlace.estimatedCalls[i].serviceJourney.journeyPattern.line.id.Split(":")[2].Split("_")[1]);
                all.Add(busRoute);

                //Puts the object in the northbound or southbound list based on what "quay" it leaves from
                if (jsonResponse.data.stopPlace.estimatedCalls[i].quay.id == "NSR:Quay:75606"){
                    northBound.Add(busRoute);
                }
                else if (jsonResponse.data.stopPlace.estimatedCalls[i].quay.id == "NSR:Quay:75607"){

                    southBound.Add(busRoute);
                }
            }
            //Creates a "BusStop"-object and returns this
            BusStop busStop = new BusStop();
            busStop.northBound = northBound;
            busStop.southBound = southBound;
            busStop.all = all;            

            return Ok(busStop);
        }
        
        
        //This file is only for endpoints relating to bus routes. 
    }
}