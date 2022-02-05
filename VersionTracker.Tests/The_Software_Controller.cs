using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using VersionTracker.Controllers;
using VersionTracker.Models;

namespace VersionTracker.Tests
{
    public class The_Software_Controller
    {
        SoftwareController controller;

        [SetUp]
        public void Setup()
        {
            controller = new SoftwareController();
        }

        [Test]
        public void given_1_0_0_gets_software()
        {
            var result = controller.Get("1.0.0");
            var response = result.Result as OkObjectResult;
            var value = response.Value as IEnumerable<Software>;
            Assert.AreEqual(7, value.Count());
        }

        [Test]
        public void given_1_gets_software()
        {
            var result = controller.Get("1");
            var response = result.Result as OkObjectResult;
            var value = response.Value as IEnumerable<Software>;
            Assert.AreEqual(7, value.Count());
        }

        [Test]
        public void given_1_0_gets_software()
        {
            var result = controller.Get("1.0");
            var response = result.Result as OkObjectResult;
            var value = response.Value as IEnumerable<Software>;
            Assert.AreEqual(7, value.Count());
        }

        [Test]
        public void given_1_8_0_gets_software()
        {
            var result = controller.Get("1.8.0");
            var response = result.Result as OkObjectResult;
            var value = response.Value as IEnumerable<Software>;
            Assert.AreEqual(6, value.Count());
        }

        [Test]
        public void given_1_35_1_gets_software()
        {
            var result = controller.Get("1.35.1");
            var response = result.Result as OkObjectResult;
            var value = response.Value as IEnumerable<Software>;
            Assert.AreEqual(5, value.Count());
        }

        [Test]
        public void given_a_letter_gets_bad_result()
        {
            var result = controller.Get("a");
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
        }

        [Test]
        public void given_too_many_numbers_gets_bad_result()
        {
            var result = controller.Get("1.2.3.4");
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
        }
    }
}