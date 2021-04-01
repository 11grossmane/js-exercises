const http = require("http")
const cluster = require("cluster")
const { createNodeRedisClient } = require("handy-redis")

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < 2; i++) {
    cluster.fork()
  }
  cluster.on("message", (worker, msg) => {
    console.log("worker id:", worker.id, "msg:", msg)
  })
} else {
  const client = createNodeRedisClient()
  http
    .createServer((req, res) => {
      let d = ""
      process.send(`my worker id is: ${cluster.worker.id}`)
      req.on("data", (chunk) => {
        d += chunk
      })
      req.on("end", () => {
        res.statusCode = 200
        const data = JSON.parse(d)

        let keys = Object.keys(data)
        let values = Object.values(data)
        console.log("keys", keys[0], "values", values[0])
        let keyNumber = +keys[0].split("y")[1]
        let prevKey = `key${keyNumber - 1}`
        res.setHeader("Content-Type", "application/json")
        client
          .set(keys[0], values[0])
          .then(() => client.get(prevKey.toString()))
          .then((item) => console.log("item is", item))
        client.expire(keys[0], 10)
        res.write(d)
        res.end()
      })
    })
    .listen(8000)
  console.log("listening on 8000")
}
