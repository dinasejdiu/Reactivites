using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Festivales
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Festivali Festivali { get; set; }
        }
          public class CommandValidator : AbstractValidator<Command>
        {
       public CommandValidator()
            {
                RuleFor(x => x.Festivali).SetValidator(new FestivaliValidator());
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
                var festivali = await _context.Festivales.FindAsync(request.Festivali.Id);
                
                if (festivali == null) return null;

                _mapper.Map(request.Festivali, festivali);

               var result =  await _context.SaveChangesAsync() > 0;

               if(!result) return Result<Unit>.Failure("Failed to update festival");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}