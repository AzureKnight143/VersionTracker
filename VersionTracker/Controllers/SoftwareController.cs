using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using VersionTracker.Models;

namespace VersionTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SoftwareController : ControllerBase
    {
        public SoftwareController() { }

        [HttpGet("{version}")]
        public ActionResult<IEnumerable<Software>> Get(string version)
        {
            int[] searchVersionInts;

            try
            {
                searchVersionInts = ExtractVersionNumbers(version);

                if (searchVersionInts.Length > 3)
                    throw new Exception("Too Many Digits");
            }
            catch (Exception e)
            {
                return BadRequest("Not a Valid Version, " + e);
            }

            return Ok(SoftwareManager.GetAllSoftware().Where(software =>
            {
                var softwareVersionInts = ExtractVersionNumbers(software.Version);
                return softwareVersionInts[0] > searchVersionInts[0]
                || (softwareVersionInts[0] == searchVersionInts[0] && softwareVersionInts[1] > searchVersionInts[1])
                || (softwareVersionInts[0] == searchVersionInts[0] && softwareVersionInts[1] == searchVersionInts[1] && softwareVersionInts[2] > searchVersionInts[2]); ;
            }));
        }

        private int[] ExtractVersionNumbers(string version)
        {
            var intArray = Array.ConvertAll(
                    version.Split('.'),
                    s => int.TryParse(s, out var i)
                    ? i
                    : throw new Exception("Not a Number"));


            var intList = intArray.ToList();
            while (intList.Count < 3)
            {
                intList.Add(0);
            }

            return intList.ToArray();
        }
    }
}
