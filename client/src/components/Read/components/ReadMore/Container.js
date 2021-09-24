import React from 'react'
import Presentation from "./Presentation"
function Container(props) {
    const {blog} = props
    return (
        <div>
            <Presentation  blog={blog}/>
        </div>
    )
}

export default Container
