const { BST } = require("./classes")

let bst = new BST()
let vals = [100, 50, 75, 85, 25, 35, 1]
for (let i = 0; i < vals.length; i++) {
  bst.insert(vals[i])
}

bst.findHeight()
bst.print()
