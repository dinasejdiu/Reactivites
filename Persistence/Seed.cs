using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
               new AppUser{DisplayName = "Bob" ,UserName = "bob", Email = "bob@test.com"},
               new AppUser{DisplayName = "Tom" ,UserName = "tom", Email = "tom@test.com"},
               new AppUser{DisplayName = "Jane" ,UserName = "jane", Email = "jane@test.com"},

               };

              
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            
            if (context.Activities.Any()) return;
            
            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Aktiviteti i pare",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Ka ndodhur dy muaj me pare",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub",
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new Activity
                {
                    Title = "Future Activity 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "culture",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new Activity
                {
                    Title = "Future Activity 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new Activity
                {
                    Title = "Future Activity 3",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Another pub",
                },
                new Activity
                {
                    Title = "Future Activity 4",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Yet another pub",
                },
                new Activity
                {
                    Title = "Future Activity 5",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Just another pub",
                },
                new Activity
                {
                    Title = "Future Activity 6",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new Activity
                {
                    Title = "Future Activity 7",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Activity 2 months ago",
                    Category = "travel",
                    City = "London",
                    Venue = "Somewhere on the Thames",
                },
                new Activity
                {
                    Title = "Future Activity 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "film",
                    City = "London",
                    Venue = "Cinema",
                },
            };
    
                 if (context.Festivales.Any()) return;
            
            var festivales = new List<Festivali>
            {
                new Festivali
                {
                      Vendi = "London",
                    Vendi_Marrjes_Se_Biletes = "Cinema",
                     Date = DateTime.Now.AddMonths(9),
                    Cmimi = 50,
                   Kengetari = "film",
                  },
            };

                        if (context.Kengetaries.Any()) return;
            
            var kengetaries = new List<Kengetari>
            {
                new Kengetari
                {
                     Emri  = "Jeton",
                    Mbiemri = "Qena",
                 Date_E_Lindjes = DateTime.Now.AddMonths(11),
                  Profesioni ="Muzikant",
                  },

            };

            await context.Activities.AddRangeAsync(activities);
             await context.Festivales.AddRangeAsync(festivales);
              await context.Kengetaries.AddRangeAsync(kengetaries);


            await context.SaveChangesAsync();

        
          
        } } }
        

