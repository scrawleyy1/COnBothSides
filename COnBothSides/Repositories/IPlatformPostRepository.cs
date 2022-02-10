using COnBothSides.Models;
using System.Collections.Generic;

namespace COnBothSides.Repositories
{
    public interface IPlatformPostRepository
    {
        void AddPlatformToPost(PlatformPost platformPost);
        void DeletePlatformsForPost(int id);
        List<PlatformPost> GetAll();
        
    }
}