const quicksort = (arr, left = 0, right = arr.length - 1) => {
  if (left > right) return

  let pivot = partition(arr, left, right)
  quicksort(arr, left, pivot - 1)
  quicksort(arr, pivot + 1, right)

  return arr
}

const partition = (arr, left, right) => {
  //right is the pivot
  let pivotValue = arr[right]
  for (let i = left; i < right; i++) {
    let cur = arr[i]
    if (cur <= pivotValue) {
      swap(arr, left, i)
      left++
    }
  }
  //at the end we swap the pivot and the tail of our smaller numbers which end at left
  swap(arr, left, right)
  return left
}

const swap = (arr, i, j) => {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

let arr = [4, 5, 7, 2, 3, 4, 1, 9]
quicksort(arr)
console.log(arr)
