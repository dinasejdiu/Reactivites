using System;
using System.Threading.Tasks;
using Application.Festivales;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
      [AllowAnonymous]
    public class FestivaliController : BaseApiController
    {
     
     
        [HttpGet]
        public async Task<IActionResult> GetFestivales()
        {
            return HandleResult (await Mediator.Send(new ListF.Query()));
        }

        [HttpGet("{id}")] 

        public async Task<ActionResult> GetFestivali(Guid id)
        {
         
         return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]

        public async Task<IActionResult> CreateFestivali(Festivali festivali)
        {
            return HandleResult(await Mediator.Send(new CreateF.Command{Festivali = festivali}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditFestivali(Guid id ,Festivali festivali)
        {
            festivali.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Festivali = festivali}));
        }
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteFestivali(Guid id )
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id =id }));
        }
    }
} 

