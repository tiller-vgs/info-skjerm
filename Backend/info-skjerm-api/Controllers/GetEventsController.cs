/*
This file is for all GET-endpoints for Events
For other endpoints, create new controllers
The route for these endpoints are {baseurl}/GetEvents/{endpoint}

Authored by @Marcus-Aastum
*/

using info_skjerm_api.Model;
using Microsoft.AspNetCore.Mvc;

namespace info_skjerm_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetEventsController : ControllerBase
    {
        //Defines context for database
        private readonly ApplicationDbContext _context;
        public GetEventsController(ApplicationDbContext context) {
            _context = context;
        }

        //This endpoint returns all events in the database
        [HttpGet("allevents")]
        public IActionResult GetAllEvents()
        {
            List<Events> events = _context.Events.ToList();
            return Ok(events);
        }
        
        //This endpoint gets a specific event by an ID
        [HttpGet("eventbyid/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetEventById([FromRoute] int id) {
            var eventitem = _context.Events.SingleOrDefault(e => e.ID == id);
            
            return (eventitem != null) ? Ok(eventitem) : NotFound();
        }

        //This endpoint returns all events happening this day
        [HttpGet("todaysevents")]
        public IActionResult GetEventsToday() {
            List<Events> events = _context.Events.ToList();
            List<Events> eventstoday = [];
            for (int i = 0; i < events.Count; i++)
            {
                if (events[i].starttime?.Year == DateTime.Today.Year && events[i].starttime?.DayOfYear == DateTime.Today.DayOfYear || events[i].endtime?.Year == DateTime.Today.Year && events[i].endtime?.DayOfYear == DateTime.Today.DayOfYear){
                    eventstoday.Add(events[i]);
                }
                else if (DateTime.Now > events[i].starttime && DateTime.Now < events[i].endtime){
                    eventstoday.Add(events[i]);
                }
            }
            
            return Ok(eventstoday);
        }

        //This endpoint returns all events happening in the current calendar week
        [HttpGet("weeksevents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetWeeksEvents(){

            //Function to check if dates are in this week (use date1 for current date, date2 for event date)
            bool DatesAreInTheSameWeek(DateTime date1, DateTime date2)
            {
                var fixdate2 = date2.Date.AddDays(-1);
                var cal = System.Globalization.DateTimeFormatInfo.CurrentInfo.Calendar;
                var d1 = date1.Date.AddDays(-1 * (int)cal.GetDayOfWeek(date1));
                var d2 = fixdate2.Date.AddDays(-1 * (int)cal.GetDayOfWeek(fixdate2));

                return d1.Date == d2.Date;
            }
            List<Events> events = _context.Events.ToList();
            List<Events> weeksevents = [];
            for (int i = 0; i < events.Count; i++)
            {
                //If starttime is in this week
                if (events[i].starttime != null && DatesAreInTheSameWeek(DateTime.Now, (DateTime)events[i].starttime)){
                    weeksevents.Add(events[i]);
                }
                //if endtime is in this week
                else if (events[i].endtime != null && DatesAreInTheSameWeek(DateTime.Now, (DateTime)events[i].endtime)){
                    weeksevents.Add(events[i]);
                }
                //If both starttime is before this week, and endtime is after this week, meaning the event is still happening
                else if(events[i].starttime < DateTime.Now && events[i].endtime > DateTime.Now){
                    weeksevents.Add(events[i]);
                }
                
            }

            return (weeksevents.Count != 0) ? Ok(weeksevents) : NotFound("No events in this week");
        }

        //DO NOT add POST- PATCH/PUT or DELETE endpoints in this file. Instead, create another conntroller called i.e. "PostEventsController.cs" 
    }
}