using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Festivales
{
    public class CreateF
    {
        public class Command : IRequest <Result<Unit>>
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

     public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public  async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Festivales.Add(request.Festivali);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create FESTIVAL");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}