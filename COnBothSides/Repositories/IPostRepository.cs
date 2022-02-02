using COnBothSides.Models;
using System.Collections.Generic;

namespace COnBothSides.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetPostById(int id);
    }
}