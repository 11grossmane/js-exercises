const { DLL, Node, LRUCache } = require('./classes')
// const dll = new DLL()
// let cache = {}

// for (let i = 0; i < 5; i++) {
//     let node = new Node(i, i)
//     dll.addToHead(node)
//     cache[i] = node
// }

// dll.print()
// dll.remove(cache[2])
// dll.print()
// dll.remove(cache[0])
// dll.print()
// dll.remove(cache[4])
// dll.print()

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

let cmds = ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get']
let inputs = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]

let lru = new LRUCache()
for (let i = 0; i < cmds.length; i++) {
    let cmd = cmds[i]
    let inp = inputs[i]
    console.log(cmd, inp)
    switch (cmd) {
        case 'LRUCache':
            lru = new LRUCache(inp[0])
            break
        case 'put':
            lru.put(inp[0], inp[1])
            break
        case 'get':
            let val = lru.get(inp[0])
            console.log(val)
            break

        default:
            break
    }
    lru.dll.print()
}
