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
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseId}")]
        public IActionResult GetUserProfile(string firebaseId)
        {
            return Ok(_userProfileRepository.GetByFirebaseId(firebaseId));
        }

        [HttpGet("DoesUserExist/{firebaseId}")]
        public IActionResult DoesUserExist(string firebaseId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseId(firebaseId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("{id:int}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }

    }
}
