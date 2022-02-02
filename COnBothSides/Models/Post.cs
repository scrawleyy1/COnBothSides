using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COnBothSides.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public bool Complete { get; set; }
        public bool isFavorite { get; set; }
        public DateTime CompleteBy { get; set; }
        public DateTime CreateDateTime { get; set; }
        public UserProfile UserProfile { get; set;}
        public Category Category { get; set; }
        public int UserProfileId { get; set; }
        public int CategoryId { get; set; }
       
    }
}
