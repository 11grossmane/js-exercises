const timer = (...args) => {
  args.forEach((arg) => console.log(arg))
  let count = 0
  while (count < 1000000000) count++
  console.log("done log")
}
module.exports.timer = timer
