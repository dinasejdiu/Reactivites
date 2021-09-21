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

namespace Application.Kengetaries
{
    public class ListK
    {

        public class Query : IRequest<Result<List<Kengetari>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Kengetari>>>
        {
            private readonly DataContext _context;
       
            public Handler(DataContext context)
            {
           
                _context = context;
            }

            public async Task<Result<List<Kengetari>>> Handle(Query request, CancellationToken cancellationToken)
            {
            
                return Result<List<Kengetari>>.Success (await _context.Kengetaries.ToListAsync(cancellationToken));
            }
        }
    }
}