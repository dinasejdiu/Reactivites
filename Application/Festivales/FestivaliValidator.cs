using Domain;
using FluentValidation;

namespace Application.Festivales
{
    public class FestivaliValidator : AbstractValidator<Festivali>
    {
               public FestivaliValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Vendi).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Vendi_Marrjes_Se_Biletes).NotEmpty();
            RuleFor(x => x.Cmimi).NotEmpty();
            RuleFor(x => x.Kengetari).NotEmpty();
    }
 }

}

        