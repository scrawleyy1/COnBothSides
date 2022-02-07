using COnBothSides.Models;
using System.Collections.Generic;

namespace COnBothSides.Repositories
{
    public interface ISocialPlatformRepository
    {
        void Add(SocialPlatform socialPlatform);
        void Delete(int id);
        List<SocialPlatform> GetAll();
    }
}