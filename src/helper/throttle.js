export const throttle = (fn,delay)=>{
    let lastTime = 0
    return (...arg)=>{
       let now = Date.now()
       if(now - lastTime >= delay){
        lastTime = now
        fn(...arg)
       }
    }
}