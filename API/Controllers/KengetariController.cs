using System;
using System.Threading.Tasks;
using Application.Kengetaries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
      [AllowAnonymous]
    public class KengetariController : BaseApiController
    {
     
     
        [HttpGet]
        public async Task<IActionResult> GetKengetaries()
        {
            return HandleResult (await Mediator.Send(new ListK.Query()));
        }

        [HttpGet("{id}")] 

        public async Task<ActionResult> GetKengetari(Guid id)
        {
         
         return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]

        public async Task<IActionResult> CreateKengetari(Kengetari kengetari)
        {
            return HandleResult(await Mediator.Send(new CreateK.Command{Kengetari = kengetari}));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditKengetari(Guid id ,Kengetari kengetari)
        {
           kengetari.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Kengetari = kengetari}));
        }
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteKengetari(Guid id )
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id =id }));
        }
    }
} 

