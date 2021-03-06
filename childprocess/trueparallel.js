const cp = require("child_process")
const { timer } = require("./timer")

const parallel = (cb, ...args) => {
  const parsedArgs = args
    .map((arg) => {
      if (typeof arg === "string") return `'${arg}'`
      if (typeof arg === "object") return JSON.stringify(arg)
      return arg
    })
    .join(".")
  const child = cp.spawn("node", ["-e", `(${cb})(${parsedArgs});`], {
    cwd: __dirname, //this can also be prepended to the file name
    detached: false, //child process ends when parent ends
  })
  child.stdout.on("data", (data) => console.log(data.toString()))
}

parallel(timer, "first arg", false, 20, "second arg", { hello: 1 }, [
  "asdas",
  2,
])
console.log("this logs first even though its written after the parallel call\n")
