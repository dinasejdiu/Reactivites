using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Kengetaries
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Kengetari Kengetari { get; set; }
        }
          public class CommandValidator : AbstractValidator<Command>
        {
       public CommandValidator()
            {
                RuleFor(x => x.Kengetari).SetValidator(new KengetariValidator());
        }

     }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var kengetari = await _context.Kengetaries.FindAsync(request.Kengetari.Id);
                
                if (kengetari == null) return null;

                _mapper.Map(request.Kengetari, kengetari);

               var result =  await _context.SaveChangesAsync() > 0;

               if(!result) return Result<Unit>.Failure("Failed to update festival");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}