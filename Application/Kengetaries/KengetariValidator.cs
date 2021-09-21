using Domain;
using FluentValidation;

namespace Application.Kengetaries
{
    public class KengetariValidator : AbstractValidator<Kengetari>
    {
        public KengetariValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Mbiemri).NotEmpty();
            RuleFor(x => x.Date_E_Lindjes).NotEmpty();
            RuleFor(x => x.Profesioni).NotEmpty();
           
        }
    }
}