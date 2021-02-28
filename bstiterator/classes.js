var BSTIterator = function (root) {
  this.stack = []
  this.root = root
  this.buildStack()
}

BSTIterator.prototype.buildStack = function (node = this.root) {
  if (node !== this.root) console.log("building")
  if (!node) return
  this.stack.push(node)
  this.buildStack(node.left)
}

BSTIterator.prototype.next = function () {
  //we always return
  let top = this.stack.pop()
  if (!top) return null
  if (top.right) {
    //return before finish rebuilding
    Promise.resolve(this.buildStack(top.right))
  }
  console.log("hi")

  return top.val
}

BSTIterator.prototype.hasNext = function () {
  return !!this.stack.length
}

module.exports = { BSTIterator }
