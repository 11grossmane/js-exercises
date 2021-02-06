let removeBars = (l, w, removeL, removeW) => {
    removeL.sort()
    removeW.sort()
    let maxConsecL = 1
    let curConsec = 1
    for (let i = 1; i < removeL.length; i++) {
        if (removeL[i] === removeL[i - 1] + 1) {
            curConsec++
            maxConsecL = Math.max(maxConsecL, curConsec)
        } else {
            curConsec = 1
        }
    }
    let maxConsecW = 1
    curConsec = 1
    for (let i = 1; i < removeW.length; i++) {
        if (removeW[i] === removeW[i - 1] + 1) {
            curConsec++
            maxConsecW = Math.max(maxConsecW, curConsec)
        } else {
            curConsec = 1
        }
    }
    return maxConsecL * maxConsecW
}

let res = removeBars(4, 4, [2, 3], [2])

console.log(res)
