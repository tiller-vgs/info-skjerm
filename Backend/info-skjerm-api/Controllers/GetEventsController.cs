using System.ComponentModel;
using System.Text.Json;
using info_skjerm_api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace info_skjerm_api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class GetEventsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public GetEventsController(ApplicationDbContext context) {
            _context = context;
        }
        [HttpGet("allevents")]
        public IActionResult GetAllEvents()
        {
            List<Events> events = _context.Events.ToList();
            return Ok(events);
        }
        
        [HttpGet("eventbyid/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetEventById([FromRoute] int id) {
            var eventitem = _context.Events.SingleOrDefault(e => e.ID == id);
            
            return (eventitem != null) ? Ok(eventitem) : NotFound();
        }

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

        [HttpGet("weeksevents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetWeeksEvents(){

            //TODO: This currently uses a week that starts on sunday, change this to monday
            bool DatesAreInTheSameWeek(DateTime date1, DateTime date2)
            {
                var cal = System.Globalization.DateTimeFormatInfo.CurrentInfo.Calendar;
                var d1 = date1.Date.AddDays(-1 * (int)cal.GetDayOfWeek(date1));
                var d2 = date2.Date.AddDays(-1 * (int)cal.GetDayOfWeek(date2));

                return d1 == d2;
            }
            List<Events> events = _context.Events.ToList();
            List<Events> weeksevents = [];
            for (int i = 0; i < events.Count; i++)
            {
                if (events[i].starttime != null && DatesAreInTheSameWeek(DateTime.Now, (DateTime)events[i].starttime)){
                    weeksevents.Add(events[i]);
                }
                else if (events[i].endtime != null && DatesAreInTheSameWeek(DateTime.Now, (DateTime)events[i].endtime)){
                    weeksevents.Add(events[i]);
                }
                
            }

            return (weeksevents != null) ? Ok(weeksevents) : NotFound("No events in this week");
        }

        //DO NOT add POST- PATCH/PUT or DELETE endpoints in this file. Instead, create another conntroller called i.e. "PostEventsController.cs" 
    }
}