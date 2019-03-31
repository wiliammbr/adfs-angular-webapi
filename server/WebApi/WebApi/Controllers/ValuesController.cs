﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApi.Controllers
{
    [Authorize]
    public class ValuesController : ApiController
    {
        // GET api/values
        [Authorize]
        public IEnumerable<string> Get()
        {
            return new string[] { "Result 1", "Result 2" };
        }

        // GET api/values/5
        [Authorize]
        public string Get(int id)
        {
            return "Result " + id;
        }

        // POST api/values
        [Authorize]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [Authorize]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [Authorize]
        public void Delete(int id)
        {
        }
    }
}
