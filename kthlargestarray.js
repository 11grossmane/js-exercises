const findKthLargest = (arr, k) => {
  return quicksort(arr, k, 0, arr.length - 1)
}

const quicksort = (arr, k, left, right) => {
  if (left > right) return
  let pivotIndex = partition(arr, left, right)
  let finalPositionOfK = arr.length - k

  //the pivotValue is now in its final position (at pivotIndex)
  if (pivotIndex < finalPositionOfK) {
    //then we only care about numbers to the right of the pivot
    return quicksort(arr, k, pivotIndex + 1, right)
  } else if (pivotIndex > finalPositionOfK) {
    //then we only care about numbers to the left of the pivot
    return quicksort(arr, k, left, pivotIndex - 1)
  } else return arr[pivotIndex]
}

let partition = (arr, left, right) => {
  let pivotValue = arr[right]

  //left serves as our placer, i is our scanner, we put all smaller values of arr[i] to the left
  for (let i = left; i < right; i++) {
    if (arr[i] <= pivotValue) {
      swap(arr, left, i)
      //increment our placer
      left++
    }
  }
  swap(arr, left, right)

  //return position of our new pivot
  return left
}

let swap = (arr, i, j) => {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

let arr = [4, 5, 7, 2, 3, 4, 1, 9]
let ans = findKthLargest(arr, 3)
console.log(ans)
