using COnBothSides.Models;
using System.Collections.Generic;

namespace COnBothSides.Repositories
{
    public interface ICategoryRepository
    {
        void Add(Category category);
        List<Category> GetAll();
        void Delete(int id);
        void Update(Category category);
        Category GetCategoryById(int id);
    }
}