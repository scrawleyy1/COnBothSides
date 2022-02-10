using COnBothSides.Models;
using System.Collections.Generic;

namespace COnBothSides.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll(int id);
        Post GetPostById(int id);
        public void Add(Post post);
        public void Delete(int id);
        public void Update(Post post);
    }
}