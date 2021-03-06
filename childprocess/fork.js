const cp = require("child_process")

const child = cp.fork("forkexec.js", {
  stdio: ["inherit", "inherit", "inherit", "ipc"],
  cwd: __dirname, //this can also be prepended to the file name
  detached: false, //child process ends when parent ends
})
child.on("message", (msg) => console.log(msg.toString()))
console.log("after")
