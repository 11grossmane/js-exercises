const http = require("http")
const util = require("util")

let req = http.request(
  {
    hostname: "localhost",
    port: 9000,
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },
  (res) => {
    res.on("data", (d) => {
      //d is of type Buffer
      console.log(util.inspect(d))
      //can also convert an array of bytes to string with new Buffer(arrayOfBytes).toString()

      console.log(d.toString())
    })
  }
)

req.write(JSON.stringify({ hello: "json" }))

req.on("response", (r) => {
  console.log("headers", r.headers)
})

req.end()
