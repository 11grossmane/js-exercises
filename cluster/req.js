const http = require("http")
const options = {
  hostname: "localhost",
  port: 8000,
  path: "/",
  method: "POST",
}

const pause = (ms) => new Promise((res) => setTimeout(res, ms))

const makeReq = async () => {
  for (let i = 0; i < 20; i++) {
    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on("data", (d) => {
        console.log("data from server", d.toString())
      })
    })
    let key = `key${i}`
    let val = `value${i}`

    req.write(JSON.stringify({ [key]: val }))
    req.on("error", (error) => {
      console.error(error)
    })
    req.end()
    console.log("logging i", i)
    await pause(500)
  }
}

makeReq()
