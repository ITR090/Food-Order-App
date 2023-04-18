import React from 'react'

export const Button = (props) => {
    return (
        <button type={props.btnType} className={props.btnStyle} onClick={props.click}>{props.children}</button>
    )
}
