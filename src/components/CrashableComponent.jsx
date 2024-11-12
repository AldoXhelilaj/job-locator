const CrashableComponent = ({onError})=>{
    const throwError = ()=>{
        onError( new Error("This is a simulated Error"))
    }

    return (
        <div>
            <button onClick={throwError}>Click me to crash</button>
        </div>
    )
}

export default CrashableComponent;