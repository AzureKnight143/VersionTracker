using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace VersionTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SoftwareController : ControllerBase
    {

        public SoftwareController() { }

        [HttpGet("{version}")]
        public IEnumerable<Software> Get(string version)
        {
            return SoftwareManager.GetAllSoftware();
        }
    }
}
