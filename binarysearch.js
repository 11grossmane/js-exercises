const binarysearch = (arr, target) => {
  let left = 0
  let right = arr.length - 1

  //we checked all the possible mid points if we go until left <= right
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (arr[mid] === target) return mid
    if (target < arr[mid]) right = mid - 1
    else left = mid + 1
  }
  return -1
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8]

console.log(binarysearch(arr, 8))
