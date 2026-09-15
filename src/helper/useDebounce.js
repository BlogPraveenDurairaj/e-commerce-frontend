
const useDebounce = (fun, delay) => {
    let timer;
    return (...age) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fun(...age)
        }, delay)
    }
}