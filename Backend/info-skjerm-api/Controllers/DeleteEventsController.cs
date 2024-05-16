/*
This file is for all DELETE-endpoints for Events
For other endpoints, create new controllers
The route for these endpoints are {baseurl}/DeleteEvents/{endpoint}

Authored by @Marcus-Aastum
*/

using info_skjerm_api.Model;
using Microsoft.AspNetCore.Mvc;

namespace info_skjerm_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeleteEventsController : ControllerBase
    {
        //Defines context for database
        private readonly ApplicationDbContext _context;
        public DeleteEventsController(ApplicationDbContext context) {
            _context = context;
        }

        //This endpoint deletes an event based on id from url
        [HttpDelete("byid/{id}")]
        public IActionResult DeleteEventById([FromRoute] int id)
        {
            //Searches for the event, and if it doesn't exist then return not found
            var eventitem = _context.Events.SingleOrDefault(e => e.ID == id);
            if (eventitem == null){
                return NotFound();
            }

            //Removes the item and returns OK
            _context.Events.Remove(eventitem);
            _context.SaveChanges();
            return Ok();
        }
        
        
        //DO NOT add GET- PATCH/PUT or POST endpoints in this file. Instead, create another conntroller called i.e. "PatchEventsController.cs" 
    }
}