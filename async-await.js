//if async function returns promise, it gets resolved with await keyword
const func1 = async () => {
    return new Promise((r) => setTimeout(() => r(1), 1000))
}

const func2 = async () => {
    await new Promise((r, re) =>
        setTimeout(() => {
            r()
        }, 1000)
    )
}

const enact = async () => {
    console.log(await func1())
    console.log('waiting for first console.log')
    await func2()
    console.log('waited')
}
enact()
