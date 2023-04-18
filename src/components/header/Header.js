import React,{useState,useContext} from 'react'
import { Button } from '../UI/Button'
import {ShoppingCart} from '../ShoppingCart'
import {CartContext} from '../myContext/Cart-Context'
import HeaderStyles from './Header.module.css'
import HeaderCartButtonStyles from './HeaderCartButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
export const Header = () => {

    const [show, setShow] = useState(false);
    const context = useContext(CartContext)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        {/* className="d-flex justify-content-around p-3" */}
        <header className={HeaderStyles.header}>
            <div><h4>FoodApp</h4></div>
    
            <div>
                 
                 <Button click={handleShow} btnStyle={HeaderCartButtonStyles.button}>
                     <div><FontAwesomeIcon icon={faCartShopping} className={HeaderCartButtonStyles.icon} /></div>
                     <div style={{marginLeft:'1rem'}}>Your Cart <span className={HeaderCartButtonStyles.badge}>{context.cartCounter}</span></div>
                 </Button>
            </div>
        </header>
        {show ? <ShoppingCart show={show} onHide={handleClose} clickClose={handleClose}/> : null}
        </>
    )
}
