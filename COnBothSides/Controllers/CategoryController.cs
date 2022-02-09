using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using COnBothSides.Models;
using COnBothSides.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace COnBothSides.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {

            _categoryRepository.Add(category);
            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.Update(category);
            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            return Ok(_categoryRepository.GetCategoryById(id));
        }
    }
}
