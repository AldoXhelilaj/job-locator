import { useEffect, useState } from "react"

const withErrorBoundary = (WrappedComponent) =>{
    return (props)=>{
        const [error, setError] = useState(null);

        // const handleError = ()=>{
        //     setError(error)

        // }

        useEffect(()=>{
            // setError(null)
        }, [error])

        if(error) {
        return (
            <div>
                <h2>Something wen wrong</h2>
                <p>{error.message}</p>
                <button onClick={() => setError(null)}>Try Again</button>
            </div>
        )
        }

        return <WrappedComponent {...props} onError={setError}/>
    }
}

export default withErrorBoundary;