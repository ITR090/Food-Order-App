import React from 'react'
import CardCss from './Card.module.css'

export const Card = (props) => {
    return (
        <div className={` ${'container'} ${CardCss.card} `}>
            {props.children}
        </div>
    )
}
