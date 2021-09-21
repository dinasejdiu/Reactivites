using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Kengetaries
{
    public class CreateK
    {
        public class Command : IRequest <Result<Unit>>
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

     public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public  async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Kengetaries.Add(request.Kengetari);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create FESTIVAL");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}