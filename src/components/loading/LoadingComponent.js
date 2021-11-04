import React from 'react'
import "./loading.css"
function LoadingComponent() {
    return (
        <div className="text-center loading__container">
            <div className="lds-hourglass "></div>
        </div>
    )
}

export default LoadingComponent
