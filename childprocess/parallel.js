const parallel = require("run-parallel")

const timer = (cb) => {
  let count = 0
  while (count < 1000000000) count++
  cb(null, "counter finished")
}

parallel([timer, (cb) => cb(null, "after")], (err, results) => {
  console.log(results)
})
console.log("after")
