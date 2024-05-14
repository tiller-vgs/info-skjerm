/*
This file is for all POST-endpoints for Events
For other endpoints, create new controllers
The route for these endpoints are {baseurl}/PostEvents/{endpoint}

Authored by @Marcus-Aastum
*/

using info_skjerm_api.Model;
using Microsoft.AspNetCore.Mvc;

namespace info_skjerm_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostEventsController : ControllerBase
    {
        //Defines context for database
        private readonly ApplicationDbContext _context;
        public PostEventsController(ApplicationDbContext context) {
            _context = context;
        }

        //This endpoint creates a new event based on data from body
        [HttpPost("createevent")]
        public IActionResult CreateEvent(Events events)
        {
            //Returns 400 error if event does not have a title
            if(events.title == null || events.title.Length == 0){
                return BadRequest("Event must have a title");
            }

            //Tries to add event, if an error occurs, throw 400
            try{
                _context.Events.Add(events);
                _context.SaveChanges();
                return Ok(events);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
        
        
        //DO NOT add GET- PATCH/PUT or DELETE endpoints in this file. Instead, create another conntroller called i.e. "PatchEventsController.cs" 
    }
}