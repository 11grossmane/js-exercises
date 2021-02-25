class Calendar {
  constructor() {
    this.cal = null
  }
  book(start, end) {
    if (!this.cal) {
      this.cal = new Node(start, end)
      return true
    }
    let bs = (start, end, node) => {
      if (end <= node.start) {
        if (node.left) return bs(start, end, node.left)
        node.left = new Node(start, end)
        return true
      } else if (start >= node.end) {
        if (node.right) return bs(start, end, node.right)
        node.right = new Node(start, end)
        return true
      }
      return false
    }
    return bs(start, end, this.cal)
  }
  remove(start) {
    let helper = (node, start) => {
      if (!node) return node
      if (start === node.start) {
        if (!node.left && !node.right) return null
        if (node.left && !node.right) return node.left
        if (node.right && !node.left) return node.right
        //we find successor and stick our left subtree on it, then return our right subtree
        //which contains the tacked on piece
        // let cur = node.right
        // while (cur.right) cur = cur.right
        let successor = findSuccessor(node)
        //now our left subtree is tacked on to the left end of our successor
        //so the right subtree contains everything we need
        successor.left = node.left
        return node.right
      }
      if (start < node.start) {
        //rebuild left
        node.left = helper(node.left, start)
      } else {
        //build right
        node.right = helper(node.right, start)
      }
      return node
    }
    helper(this.cal, start)
    return this.cal
  }
  get(start, node = this.cal) {
    if (!node) throw new Error("node does not exist")
    if (start === node.start) return node
    else if (start < node.start) {
      return this.get(start, node.left)
    } else {
      return this.get(start, node.right)
    }
  }
}

class Node {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.left = null
    this.right = null
  }
}

let findSuccessor = (node) => {
  node = node.right
  while (node.left) {
    node = node.left
  }
  return node
}

const bookings = [
  [3, 4],
  [1, 2],
  [8, 10],
  [6, 7],
  [4, 5],
  [10, 13],
]
let calendar = new Calendar()
bookings.forEach((booking) => {
  calendar.book(...booking)
})
let n = calendar.get(10)
console.log(n)
// calendar.remove(8)
// console.log(calendar.cal)

// let a = new Node(1,2)
// a.right = new Node(3,4)
// a.left = new Node(5,6)
// let cur = a
// console.log(cur===a)
// console.log('a 1',a)
// cur = cur.right
// console.log(cur===a.right)
// console.log('a 2',a)
// console.log(cur.right===a.right.right)
// cur.right = a.left
// console.log()
// console.log('a 3',a)

// let b = (node)=>{
// let c = {...node}
// c = {a:{b:1}}
// return (c.a===q.a)
// }
// let q = {a:{b:1}}
// console.log(b(q))
