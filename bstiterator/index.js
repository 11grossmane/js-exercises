const { BSTIterator } = require("./classes")
const { BST } = require("../bst/classes")

let bst = new BST()
let vals = [100, 50, 75, 85, 25, 35, 1]
for (let i = 0; i < vals.length; i++) {
  bst.insert(vals[i])
}

//iterating from 50
let node = bst.search(50)

let iterator = new BSTIterator(node)

while (iterator.hasNext()) {
  console.log(iterator.stack.map((node) => node.val))

  console.log(iterator.next())
}
