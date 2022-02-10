using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COnBothSides.Models
{
    public class PlatformPost
    {
        public int Id { get; set; }
        public SocialPlatform SocialPlatform { get; set; }
        public Post Post { get; set; }
        public int SocialPlatformId { get; set; }
        public int PostId { get; set; }
    }
}
