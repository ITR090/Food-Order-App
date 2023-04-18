import classes  from './UI/CheckOutForm.module.css'
import {Button} from './UI/Button'
import { useRef,useState } from 'react'

export const CheckOutForm = (props) => {

    const name = useRef();
    const street = useRef();
    const postal = useRef();
    const city = useRef();
    const [inputsFormVaild,setInputsFormVaild] = useState({
        name:true,
        street: true,
        city:true,
        postal:true,
    })

    const IsEmpty= value => value.trim().length == 0

    const ConfirmHandler = (event)=>{
        event.preventDefault()
        const nameValue = name.current.value;
        const streetValue = street.current.value;
        const postalValue = postal.current.value;
        const cityValue = city.current.value;
        setInputsFormVaild({
            name:nameValue,
            street:streetValue,
            city:cityValue,
            postal:postalValue
        })
        if(!IsEmpty(nameValue) && !IsEmpty(streetValue) && postalValue.length == 5 && !IsEmpty(cityValue)){

            const allValues ={
                UserName:nameValue,
                street:streetValue,
                city:cityValue,
                postal:postalValue
            }
            props.onConfirm(allValues);
        }
    }
    return (
        <form className={classes.form} onSubmit={ConfirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={name} />
                {!inputsFormVaild.name && <p>Name cant not be Empty</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={street} />
                {!inputsFormVaild.street && <p>Street cant be Empty</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postal} />
                {!inputsFormVaild.postal && <p>postal cant be Empty</p>}
            </div>
            <div className={classes.control}>
                <label className={classes.invalid} htmlFor='city'>City</label>
                <input className={classes.invalid} type='text' id='city' ref={city} />
                {!inputsFormVaild.city && <p>City cant be Empty</p>}
            </div>
            <div className={classes.actions}>
                <Button btnType="button" click={props.click}>Cancel</Button>
                <Button btnType="submit" btnStyle={classes.submit}>Confirm</Button>
            </div>
        </form>
    )
}