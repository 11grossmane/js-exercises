/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let res = []
  let map = {}
  let unique = 0
  for (let char of p) {
    if (map[char]) map[char]++
    else {
      map[char] = 1
      unique++
    }
  }
  let slow = 0
  let fast = 0
  while (fast < s.length) {
    let fastVal = s[fast]
    let slowVal = s[slow]
    if (map.hasOwnProperty(fastVal)) map[fastVal]--
    if (map[fastVal] === 0) unique--
    if (unique === 0) res.push(slow)

    //repopulate map and increment slow if we've reached our max length (length of p)
    //so that on our next iteration we can possibly get another answer
    if (fast - slow + 1 === p.length) {
      if (map.hasOwnProperty(slowVal)) map[slowVal]++

      // remember we added a unique the first time we created a hash from p...doing same thing herex
      if (map[slowVal] === 1) unique++
      slow++
    }
    fast++
  }
  return res
}

console.log(findAnagrams("asdkafsnvvnsdlfv", "snv"))
