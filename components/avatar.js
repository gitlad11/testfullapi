import React from 'react'

function Avatar(props){
    const colors = [
        "rgb(110, 201, 25)",
        "rgb(201, 125, 25)",
        "rgb(25, 87, 201)"
    ]
    function getRandomArbitrary(min, max) {
        const value = Math.round(Math.random() * (max - min) + min);
        return value;
    }

    return <div className= "avatar" style={{ backgroundColor : "rgb(110, 201, 25)" }}>{props.title}</div>
}
export default Avatar