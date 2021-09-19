using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Festivales
{
    public class Details
    {
        public class Query : IRequest<Result<Festivali>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result <Festivali>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Festivali>> Handle(Query request, CancellationToken cancellationToken)
            {
            var festivali =  await _context.Festivales.FindAsync(request.Id); 
            
            return Result<Festivali>.Success(festivali);
            }
        }
    }
}
