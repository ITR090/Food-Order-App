import React, { useContext, useState } from 'react'
import { Button } from './UI/Button';
import { Modal } from 'react-bootstrap'
import { CartContext } from './myContext/Cart-Context'
import ShoppingCartCss from './UI/ShoppingCart.module.css'
import { CheckOutForm } from './CheckOutForm'
const style = {
    cursor: 'pointer'
}
export const ShoppingCart = (props) => {
    const context = useContext(CartContext)

    const [isOrderClicked, setIsOrderClicked] = useState(false)
    const [isSubmited,setIssubmited] =useState(false)
    const [loading,setIsLoading] = useState('')
    let hasItems = context.cartContextState.cart.length > 0
    const Order = async (cart,userData,total) => {
        
        const userOrder= {
            orders:cart,
            userInfo:userData,
            totalPrice:total
        }
        const myHeaders = new Headers();
        myHeaders.append('Content-Type','application/json')
        setIssubmited(true)
        setIsLoading('Submiting...')
        const response = await fetch('https://food-app-66f9f-default-rtdb.firebaseio.com/ordres.json',{
        method:'POST',    
        headers:myHeaders,
        body : JSON.stringify(userOrder)    
        })

        if(response.ok){
           await response.json()
           setIssubmited(false)
           setIsLoading('')
        }

        context.cartContextState.cart=[]
        context.cartCounter=0
        props.clickClose()
    }
    const deleteMeal = (item) => {
        context.removeFromTheCart(item)
        context.decCartCounter()
    }
    const onAdd = (item) => {
        context.onAdd(item)
    }
    const onRemove = (item) => {
        context.onRemove(item)
    }
    let total = 0
    return (
        <Modal show={props.show} onHide={props.handleClose} >
            <Modal.Body className={ShoppingCartCss['modal-body']}>
                {context.cartContextState.cart.length !== 0 ?
                    context.cartContextState.cart.map(item => {
                        total += item.price * item.amount
                        return (
                            <>
                                <div key={item.id} className="d-flex justify-content-between">
                                    <div>
                                        <span style={style} onClick={() => deleteMeal(item)}>{item.name}</span>
                                        <span>x{item.amount}</span>
                                        <div>${item.price}</div>
                                        {/* <p>{item.description}</p> */}
                                    </div>
                                    <div className={ShoppingCartCss.actions}>
                                        <Button btnType="button" btnStyle="btn btn-dark" click={() => onAdd(item)}>+</Button>
                                        <Button btnType="button" btnStyle="btn btn-dark" click={() => onRemove(item)}>-</Button>
                                    </div>
                                </div>
                                <hr className={ShoppingCartCss.hr} />
                            </>
                        )
                    })

                    : null}
            </Modal.Body>

            <Modal.Footer className={ShoppingCartCss['modal-footer']}>
                <div className={ShoppingCartCss.total}>
                    <div>Total Amount: </div>
                    <div>${total.toFixed(2)}</div>
                </div>
                {!isOrderClicked ?
                    <div className={ShoppingCartCss.actions}>
                        <Button variant="secondary" btnType="button" click={props.clickClose}>Close</Button>
                        {hasItems && <Button variant="primary" btnType="button" click={()=>{setIsOrderClicked(true)}}>Order</Button>}
                    </div> :
                    null}
                {isOrderClicked ? <CheckOutForm click={props.clickClose} onConfirm={(userData)=>Order(context.cartContextState.cart,userData,total)} /> : null}
            </Modal.Footer>
        </Modal>
    )
}
