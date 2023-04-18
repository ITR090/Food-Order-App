import React, { useState } from "react"

const CartContext = React.createContext({
    cartContextState: [],
    addToCart: () => { },
    removeFromTheCart: () => { },
    cartCounter: 0,
    incCartCounter: () => { },
    decCartCounter: () => { },
    onAdd: () => { },
    onRemove: () => { },
})

const CartContextProvider = (props) => {

    const [cartContextState, setCartContextState] = useState({
        cart: [],
    })
    const [cartCounter, setCartCounter] = useState(0)

    const addToCart = (meal, amount) => {
        let updateeditems = [...cartContextState.cart]
        const cartExixtingItem = cartContextState.cart.findIndex(item => item.id === meal.id)
        if (cartExixtingItem !== -1) {
            const myItem = cartContextState.cart[cartExixtingItem]
            const newAmount = {
                ...myItem,
                amount: myItem.amount + amount
            }
            updateeditems[cartExixtingItem] = newAmount
            // updateeditems = newAmount
        } else {
            const addAmountToMeal = {
                ...meal,
                amount: amount
            }
            updateeditems = cartContextState.cart.concat(addAmountToMeal)
        }

        setCartContextState(oldCart => {
            return {
                cart: updateeditems //oldCart.cart.concat(addAmountToMeal),
            }
        })
    }
    const removeFromTheCart = (item) => {
        let id= item.id
        setCartContextState(oldCart => {
            return {
                cart: oldCart.cart.filter(meal => meal.id !== id)
            }
        })
    }

    const incCartCounter = () => {
        setCartCounter(cartCounter => cartCounter + 1)
    }
    const decCartCounter = () => {
        setCartCounter(cartCounter => cartCounter - 1)
    }
    const onAdd = (meal) => {
        let updatedAmount = [...cartContextState.cart]
        let cartExixtingItem = cartContextState.cart.findIndex(item => item.id === meal.id)
        if (cartExixtingItem !== -1) {
            const myItem = cartContextState.cart[cartExixtingItem]
            const newAmount = {
                ...myItem,
                amount: myItem.amount + 1
            }

            updatedAmount[cartExixtingItem] = newAmount
        }

        setCartContextState(oldState => {
            return {
                cart: updatedAmount
            }
        })

    }
    const onRemove = (meal) => {
        let cartItems = [...cartContextState.cart] // copy of your cart
        let cartExixtingItem = cartItems.findIndex(item => item.id === meal.id)
        if(cartExixtingItem !== -1 ){ // in the arrays cartItmes
          const myItem = cartItems[cartExixtingItem]
          const newItemAmount ={
                ...myItem,
                amount: myItem.amount -1
            }
            cartItems[cartExixtingItem]=newItemAmount
            setCartContextState(oldState => {
                return {
                    cart: cartItems
                }
            })
        }

        if(cartItems[cartExixtingItem].amount === 0 ){
            removeFromTheCart(cartItems[cartExixtingItem])
            decCartCounter()
         }
    }
    return (
        <CartContext.Provider value={{
            cartContextState: cartContextState,
            addToCart: addToCart,
            cartCounter: cartCounter,
            incCartCounter: incCartCounter,
            removeFromTheCart: removeFromTheCart,
            decCartCounter: decCartCounter,
            onAdd: onAdd,
            onRemove: onRemove,
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContext, CartContextProvider };