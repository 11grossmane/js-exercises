function quicksort(arr, left = 0, right = undefined) {
  //base case
  if (left > right) return

  if (right === undefined) right = arr.length - 1

  //the position that arr[right] ends up at becomes our new pivot after partition is called
  let pivot = partition(arr, left, right)
  quicksort(arr, left, pivot - 1)
  quicksort(arr, pivot + 1, right)
  return arr
}

function partition(arr, left, right) {
  let pivotValue = arr[right]
  let placer = left - 1

  /*loop through starting at left
  i represent the position that we will be putting characters that are less than our pivot
  the characters that our more than our pivot just stay where they are
  at the end we put our pivot in between these two sections
  */

  for (let runner = left; runner < right; runner++) {
    //if our runner is less than our pivot, we place it at our placer
    if (arr[runner] <= pivotValue) {
      placer++
      swap(arr, runner, placer)
    }
  }

  //sandwich our pivot in between the two created halves by swapping our right (which is index of our pivot with )
  swap(arr, placer + 1, right)

  //placer + 1 is where our pivot lives after the swap in the previous step
  return placer + 1
}

function swap(arr, first, second) {
  ;[arr[first], arr[second]] = [arr[second], arr[first]]
}
let arr = [4, 5, 7, 2, 3, 4, 1, 9]
quicksort(arr)
console.log(arr)
