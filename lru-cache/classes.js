class Node {
    constructor(key, value) {
        this.key = key || null
        this.value = value || null
        this.prev = null
        this.next = null
    }
}

class DLL {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    print() {
        let ref = this.head
        let finalStr = ''
        console.log('PRINTING DLL')
        while (ref) {
            logNode(ref, '', this)
            ref = ref.next
        }
        console.log(finalStr)
        console.log({
            head: this.head ? this.head.value : null,
            tail: this.tail ? this.tail.value : null,
            length: this.length
        })
        console.log('\n')
    }

    addToHead(node) {
        //if empty add as tail and head
        if (!this.length) {
            this.head = node
            this.tail = node
        }
        //otherwise, add as new head
        else {
            let headRef = this.head
            node.next = headRef
            headRef.prev = node

            //finally reassign head to point at new node
            this.head = node
        }
        logNode(node, 'ADDED')

        this.length++
    }

    remove(node) {
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else if (node === this.tail) {
            this.tail = node.prev
            this.tail.next = null
        } else if (node === this.head) {
            this.head = node.next
            this.head.prev = null
        } else {
            let nextRef = node.next
            let prevRef = node.prev
            if (!nextRef && !prevRef) {
                //then this node isn't in DLL
                throw new Error('node not in DLL')
            }
            prevRef.next = nextRef
            nextRef.prev = prevRef
        }

        //remove refs
        node.prev = null
        node.next = null
        logNode(node, 'REMOVED')
        this.length--
        return node
    }
}

const logNode = (node, pre, dll) => {
    console.log(
        `\n${dll && node === dll.head ? 'HEAD ' : ''}${pre} prev:${node.prev?.value ?? null} key:${
            node.key
        } val:${node.value} next:${node.next?.value ?? null}${
            dll && node === dll.tail ? ' TAIL' : ''
        }\n`
    )
}

var LRUCache = function (capacity) {
    this.cap = capacity
    this.cache = {}
    this.dll = new DLL()
}

LRUCache.prototype.get = function (key) {
    let node = this.cache[key]
    if (!node) return -1
    //make this node most recently used by moving it to head
    this.makeMostRecent(node)

    return node.value
}

LRUCache.prototype.makeMostRecent = function (node) {
    logNode(node, 'making most recent', this.dll)
    this.dll.remove(node)
    this.dll.addToHead(node)
}

LRUCache.prototype.put = function (key, value) {
    //if key exists update value
    let node = this.cache[key]
    if (node) {
        node.value = value
        this.makeMostRecent(node)
        return
    }

    //if we don't have node add it
    //if we are at capacity, remove tail before adding new node to head
    node = new Node(key, value)
    if (this.cap === this.dll.length) {
        let removedNode = this.dll.remove(this.dll.tail)
        delete this.cache[removedNode.key]
        console.log('deleting', removedNode.key)
    }
    this.cache[key] = node
    this.dll.addToHead(node)
}

module.exports = { DLL, Node, LRUCache }
