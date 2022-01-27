using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COnBothSides.Models
{
    public class UserType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int AUTHOR_ID => 2;
    }
}
