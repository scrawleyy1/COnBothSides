using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using COnBothSides.Models;
using COnBothSides.Repositories;

namespace COnBothSides.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlatformPostController : ControllerBase
    {
        private readonly IPlatformPostRepository _platformPostRepository;
        public PlatformPostController(IPlatformPostRepository platformPostRepository)
        {
            _platformPostRepository = platformPostRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<PlatformPost> platformPosts = _platformPostRepository.GetAll();
            return Ok(platformPosts);
        }

        [HttpPost("{id}")]
        public IActionResult CreatePlatformPost(int id, int postId)
        {
            _platformPostRepository.AddPlatformToPost( new PlatformPost 
            {
                PostId = postId, SocialPlatformId = id
            });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePlatformsForPost(int id)
        {
            _platformPostRepository.DeletePlatformsForPost(id);
            return NoContent();
        }

    }
}
