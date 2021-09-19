using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Festivales
{
    public class List
    {

        public class Query : IRequest<Result<List<Festivali>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Festivali>>>
        {
            private readonly DataContext _context;
       
            public Handler(DataContext context)
            {
           
                _context = context;
            }

            public async Task<Result<List<Festivali>>> Handle(Query request, CancellationToken cancellationToken)
            {
            
                return Result<List<Festivali>>.Success (await _context.Festivales.ToListAsync(cancellationToken));
            }
        }
    }
}