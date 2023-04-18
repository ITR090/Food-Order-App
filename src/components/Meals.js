import React,{useState,Fragment,useContext,useEffect} from 'react'
import {Card} from './UI/Card'
import {Button} from './UI/Button'
import {CartContext} from './myContext/Cart-Context'
import MainMeals from '../components/MealsCss/MainMeals.module.css'
import MealItem from '../components/MealsCss/MealItem.module.css'
import InputCss from './UI/InputCss.module.css'
//import CartContext from './myContext/Cart-Context'
export const Meals = () => {

    const context = useContext(CartContext)
    const [errorMes,setErrorMes] = useState()
    const [amount,setAmount]=useState()
    const [meals,setMeals] =useState([])
    const [isLoading,setIsLoading] = useState(true) // in the start
    const [isLoadingMess,setIsLoadingMess] = useState('Loading...') // in the start
    const [errorHttp,setErrorHttp] = useState();
    const db_url_meals ="https://food-app-66f9f-default-rtdb.firebaseio.com/Meals.json"
    
    const getAllMeals = async ()=>{
      try {
          const respons = await fetch(db_url_meals);
          if(!respons.ok){
              throw new Error("Something went wrong...")
          }
          const allmeals = await respons.json()
          const objValues = Object.values(allmeals)
          setMeals(objValues)
          setIsLoading(false)
          setIsLoading('')
      } catch (error) {
          setErrorHttp(error.name)
          console.log(errorHttp)
      }
    }
    const setAmountHandler=(amount)=>{
        let convertedAmount = parseInt(amount)
        if(!isNaN(convertedAmount)){
             if(convertedAmount > 0){
                 setErrorMes('')   
               return  setAmount(convertedAmount)
             }else{
                 setErrorMes('Must be more than 0')
             }
        }else{
            setErrorMes('Must be a number')
        }
    }
    const onAddMeal=(event,meal,amount)=>{ 
        event.preventDefault()
        if(typeof amount != 'undefined'){
            context.addToCart(meal,amount)
            context.incCartCounter()
        }else{

        }
    }

    useEffect( ()=>{
        getAllMeals()
    },[])

   
    if(isLoading){

        setTimeout(()=>{
            setIsLoadingMess(errorHttp)
        },3000)
    }
    return (
        <Card> 
            { isLoading ?

            <div>
                {isLoadingMess}
                
            </div> :

            meals.map(meal=>{
                return (
                    <Fragment key={meal.id}>
                    <div className={`${'d-flex justify-content-between align-items-center'} ${MainMeals.Mainmeals}`}>
                    <div>
                        <h5>{meal.name}</h5>
                        <p className={MealItem.description}>{meal.description}</p>
                        <h5 className={MealItem.price}>${meal.price}</h5>
                    </div>
                    <div>
                        <div>  
                            {errorMes}
                        </div>
                        <form className={InputCss.form}>
                             <div className={InputCss.input}>
                               <label className={InputCss.label} >Amount</label>
                               {/* <input type="number" onChange={event =>setAmount(event.target.value)}/> */}
                               <div>
                                  <input type="number" onChange={event=>{setAmountHandler(event.target.value)}}/>
                               </div>
                             </div>
                             <Button btnType="submit" click={(event)=>onAddMeal(event,meal,amount)} btnStyle="btn btn-warning">+ Add</Button>    
                        </form>
                    </div>
                    </div>
                     <hr/>
                    </Fragment>
                )
            })}
        </Card>
    )
}
