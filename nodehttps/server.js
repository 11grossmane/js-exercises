const http = require("http")
const util = require("util")

const server = http.createServer((req, res) => {
  let data = ""
  req.on("data", (chunk) => {
    data += chunk
  })
  req.on("end", () => {
    let json = JSON.parse(data)
    console.log(util.inspect(json))
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")

    res.end(data)
  })
})

//unicode is the most common mapping that is just a map of numbers to characters, the numbers are usually repre
//the max value of a byte is 255, (0-255) is 256 total characters
//utf-8 is an encoding that uses one to four bytes (can represent all of unicode map), each unit is one byte (8 bits), so 255,255,255,255 is the final utf-8 character
console.log("1".charCodeAt(0))
server.listen(9000)
console.log("listening on 9000")
