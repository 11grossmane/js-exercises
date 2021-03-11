// class PriorityQueue {
//   constructor() {
//     this.items = {}
//   }
//   add(key, val) {
//     this.items[key] = val
//   }

//   pop() {
//     let maxKey = ""
//     let max = -Infinity
//     for (let key in this.items) {
//       if (this.items[key] > max) {
//         maxKey = key
//         max = this.items[key]
//       }
//     }
//     delete this.items[maxKey]
//     return maxKey
//   }
// }

// let pq -= new PriorityQueue()

//Max Heap
class PriorityQueue {
  constructor() {
    this.items = []
  }

  add(key, priority) {
    //we add item in last spot, which is all the way to the bottom and then all the way to the right, or if we are using an array...just the final index
    this.items.push({ key, priority })
    this.bubbleup()
  }

  bubbleup(idx = this.items.length - 1) {
    let curItem = this.items[idx]
    if (!curItem) return
    //if greater than parent, swap
    let parentIdx = Math.floor((idx - 1) / 2)
    let parentItem = this.items[parentIdx]
    if (!parentItem) return
    if (curItem.priority > parentItem.priority) {
      this.swap(idx, parentIdx)
      this.bubbleup(parentIdx)
    }
  }

  pop() {
    //get our root which is at index 0, this is what we will be returning
    //after it's saved, get our final item, and place it at our root, then sink it down to the current position
    let max = this.items[0]
    let end = this.items.pop()
    if (this.items.length) {
      this.items[0] = end
      this.sinkdown()
    }
    return max.key
  }

  sinkdown(idx = 0) {
    //swap left if currentItem priority is less, other wise right
    let curItem = this.items[idx]
    if (!curItem) return

    let leftIdx = idx * 2 + 1
    let rightIdx = idx * 2 + 2
    let leftChild = this.items[leftIdx]
    //if no left child, there will be no right child either so we can just return
    let rightChild = this.items[rightIdx]

    //swap with larger of two children
    let endingIdx
    if (leftChild?.priority > curItem.priority) {
      endingIdx = leftIdx
    }
    if (rightChild?.priority > leftChild?.priority) {
      endingIdx = rightIdx
    }
    if (endingIdx === undefined) {
      //we don't need to do any swap and we can return
      return
    }

    this.swap(idx, endingIdx)
    this.sinkdown(endingIdx)
  }

  swap(i, j) {
    ;[this.items[i], this.items[j]] = [this.items[j], this.items[i]]
  }
}

let pq = new PriorityQueue()

pq.add("guava", 10)
pq.add("apple", 20)
pq.add("pineapple", 15)
pq.add("orange", 12)
pq.add("grape", 30)

console.log(pq.items, pq.maxes)

console.log(pq.pop())
console.log(pq.pop())
console.log(pq.pop())
console.log(pq.pop())
console.log(pq.pop())
