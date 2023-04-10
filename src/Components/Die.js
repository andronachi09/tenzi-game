import React from "react"
import "../style/Die.css"

export default function Die(props) {
    return(
        <div>
            <h2 className="die--h2">{props.value}</h2>
        </div>
    )
}