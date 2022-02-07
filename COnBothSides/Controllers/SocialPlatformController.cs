using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using COnBothSides.Models;
using COnBothSides.Repositories;

namespace COnBothSides.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialPlatformController : ControllerBase
    {
        private readonly ISocialPlatformRepository _socialPlatformRepository;

        public SocialPlatformController(ISocialPlatformRepository socialPlatformRepository)
        {
            _socialPlatformRepository = socialPlatformRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_socialPlatformRepository.GetAll());
        }

        [HttpPost]
        public IActionResult AddSocialPlatform(SocialPlatform socialPlatform)
        {
            _socialPlatformRepository.Add(socialPlatform);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _socialPlatformRepository.Delete(id);
            return NoContent();
        }
    }
}
