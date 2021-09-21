using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Kengetaries
{
    public class Details
    {
        public class Query : IRequest<Result<Kengetari>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result <Kengetari>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Kengetari>> Handle(Query request, CancellationToken cancellationToken)
            {
            var kengetari =  await _context.Kengetaries.FindAsync(request.Id); 
            
            return Result<Kengetari>.Success(kengetari);
            }
        }
    }
}
