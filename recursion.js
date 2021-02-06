const addRecursively = (array) => {
    let sum = 0
    const adder = (recursiveArray) => {
        for (let i = 0; i < recursiveArray.length; i++) {
            if (typeof recursiveArray[i] === 'number') {
                sum += recursiveArray[i]
            } else {
                adder(recursiveArray[i])
            }
        }
    }

    adder(array)
    return sum
}

const nestedArray = [1, [2, 3, [4]]]
console.log(addRecursively(nestedArray))

const addRecursivelyNoClosure = (array) => {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === 'number') {
            sum += array[i]
        } else {
            sum += addRecursivelyNoClosure(array[i])
        }
    }
    return sum
}

console.log(addRecursivelyNoClosure(nestedArray))
