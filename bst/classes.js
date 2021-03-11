const util = require("util")

class BST {
  constructor() {
    this.root = null
  }
  insert(val) {
    if (!this.root) {
      this.root = new Node(val)
      return
    }
    const insertHelper = (node, val) => {
      if (val < node.val) {
        if (!node.left) {
          node.left = new Node(val)
        } else {
          insertHelper(node.left, val)
        }
      } else {
        if (!node.right) {
          node.right = new Node(val)
        } else {
          insertHelper(node.right, val)
        }
      }
    }
    insertHelper(this.root, val)
  }
  search(val) {
    const searchHelper = (node) => {
      if (!node) throw new Error("node not found")
      //preorder
      if (val === node.val) return node
      else if (val < node.val) return searchHelper(node.left)
      else if (val > node.val) return searchHelper(node.right)
    }
    let res = searchHelper(this.root)
    this.print(res)
    return res
  }
  remove(val) {
    // O(logn * k is height of tree)
    let rebuild = (val, node) => {
      if (!node) return node
      if (node.val === val) {
        //we've found match, we need to remove it

        //no children
        if (!node.left && !node.right) return null
        else if (!node.left && node.right) return node.right
        else if (node.left && !node.right) return node.left
        else {
          //we have two children so we tack our left subtree onto our successor (the leftmost node of our right subtree), then we point our parent at the left subtree, thereby breaking the link to the node we are trying to delete
          let successor = this.findSuccessor(node)

          //our node is less than our successor, so tacking our node.left onto our successor always works
          successor.left = node.left

          //our successor is already inside node.right (it's the leftmost element) and it now contains everything that was in node.left.  So, it has everything we need
          return node.right
        }
      } else if (val < node.val) {
        if (!node.left) throw new Error("left doesnt exist")
        node.left = rebuild(val, node.left)
      } else {
        if (!node.right) throw new Error("right doesnt exist")
        node.right = rebuild(val, node.right)
      }
    }
    rebuild(val, this.root)
    return this.root
  }
  findSuccessor(node) {
    //successor (next greatest value) is left most node in right subtree
    node = node.right
    while (node.left) {
      node = node.left
    }
    return node
  }
  print(node = this.root) {
    console.log(util.inspect(node, true, Infinity))
  }

  logNode(node) {
    console.log(
      `left:${node.left?.val ?? null} val:${node.val ?? null} right:${
        node.right?.val ?? null
      }`
    )
  }
  isValid() {
    const isValidHelper = (node, upper = Infinity, lower = -Infinity) => {
      if (!node) return true
      if (node.val >= upper) {
        console.log(node.val, upper)
        return false
      }
      if (node.val < lower) {
        console.log("lower", node.val, lower)
        return false
      }
      return (
        isValidHelper(node.left, node.val, lower) &&
        isValidHelper(node.right, upper, node.val)
      )
    }

    return isValidHelper(this.root)
  }
  findHeight() {
    //0(n)
    if (!this.root) return 0
    let maxHeight = 1
    const findHeightHelper = (node = this.root, height = 1) => {
      if (!node) {
        maxHeight = Math.max(maxHeight, height - 1)
        return
      }
      findHeightHelper(node.left, height + 1)
      findHeightHelper(node.right, height + 1)
    }
    findHeightHelper()

    console.log("height is", maxHeight)
    return maxHeight
  }
}

class Node {
  constructor(val) {
    this.left = null
    this.right = null
    this.val = val
  }
}

module.exports = { BST, Node }
