class LRUCache {
  constructor(capacity) {
    this.dll = new DLL()
    this.cache = {}
    this.capacity = capacity
  }

  add(key, val) {
    if (this.dll.size === this.capacity) {
      //eject item if over tje capacity

      console.log("removing", this.dll.size, this.capacity)
      let nodeToRemove = this.dll.removeFromHead()
      delete this.cache[nodeToRemove.key]
    }
    let node = new Node(key, val)
    this.dll.addToTail(node)
    this.cache[key] = node
    console.log("adding", this.dll.size)
  }

  remove(key) {
    let node = this.cache[key]
    if (!node) {
      console.log("node does not exist")
      return
    }
    this.dll.remove(node)
    delete this.cache[key]
    return node.val
  }

  peek(key) {
    let node = this.cache[key]
    if (!node) return
    this.dll.moveToTail(node)
    console.log("peeking", this.dll.size)
    return node.val
  }
}

class Node {
  constructor(key, val) {
    this.key = key
    this.val = val
    this.next = null
    this.prev = null
  }
}

class DLL {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  print() {
    let ref = this.head
    let finalStr = ""
    console.log("PRINTING DLL")
    while (ref) {
      console.log("val is", ref?.val)
      ref = ref.next
    }
    console.log(finalStr)
    console.log({
      head: this.head ? this.head.val : null,
      tail: this.tail ? this.tail.val : null,
      length: this.size,
    })
    console.log("\n")
  }

  addToTail(node) {
    if (!node) return
    if (!this.size) {
      this.size++
      this.head = node
      this.tail = node
      return
    }
    console.log("node adding", node.val)
    this.size++
    let tailRef = this.tail
    node.next = null
    node.prev = tailRef
    if (tailRef) tailRef.next = node
    this.tail = node
  }

  remove(node) {
    if (!node) {
      console.log("node does not exist")
      return
    }
    if (this.size === 1) {
      this.head = null
      this.tail = null
    }
    if (node === this.head) {
      this.head = node.next || null
      this.head.prev = null
    } else if (node === this.tail) {
      this.tail = node.prev || null
      this.head.next = null
    } else {
      let prevRef = node.prev || null
      let nextRef = node.next || null
      if (prevRef) prevRef.next = nextRef
      if (nextRef) nextRef.prev = prevRef
    }
    this.size--
  }

  moveToTail(node) {
    this.remove(node)
    this.addToTail(node)
  }

  removeFromHead() {
    let headRef = this.head
    let newHeadRef = this.head.next
    this.head = newHeadRef
    this.head.prev = null
    this.size--
    return headRef
  }
}

let cmds = [
  "LRUCache",
  "put",
  "put",
  "get",
  "put",
  "get",
  "put",
  "get",
  "get",
  "get",
]
let inputs = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
let lru
for (let i = 0; i < cmds.length; i++) {
  let cmd = cmds[i]
  let inp = inputs[i]

  switch (cmd) {
    case "LRUCache":
      lru = new LRUCache(inp[0])
      break
    case "put":
      lru.add(inp[0], inp[1])
      break
    case "get":
      // eslint-disable-next-line no-case-declarations
      let val = lru.peek(inp[0])
      console.log(val)
      break

    default:
      break
  }
  lru.dll.print()
}
