const timer = () => {
  let count = 0
  while (count < 1000000000) count++
  console.log("done log")
  process.send("done counting")
}
timer()
