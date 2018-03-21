export default  store => next => action=>{
    console.groupCollapsed("Dispatching", action)
    console.log("Before Dispatching", store.getState())
    let result = next(action)
    console.log("After Dispaching ", store.getState())
    console.groupEnd()
    return result
}