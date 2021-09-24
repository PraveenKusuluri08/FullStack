import React, { useState } from 'react'
import Presentation from "./Presentation"
function Container(props) {
    const [state,setState]= useState({
    password:"",conformPassword:""
    })
    return (
        <div>
            <Presentation state={state} setState={setState}/>
        </div>
    )
}

export default Container
