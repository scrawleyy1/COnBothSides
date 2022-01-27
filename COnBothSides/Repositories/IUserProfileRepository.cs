using COnBothSides.Models;
using System.Collections.Generic;

namespace COnBothSides.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAll();
        UserProfile GetByFirebaseId(string firebaseId);
        UserProfile GetUserProfileById(int id);
    }
}