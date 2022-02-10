using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using COnBothSides.Models;
using COnBothSides.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace COnBothSides.Controllers
{
    [Authorize]
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

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = 1;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseId = userProfile.FirebaseId },
                userProfile);
        }

    }
}
