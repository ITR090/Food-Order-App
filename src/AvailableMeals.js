import { useEffect, useState } from "react"


export const AvailableMeals = (props)=>{

    const [meals,setMeals] =useState([])
    const [isLoading,setIsLoading] = useState(true) // in the start
    const [isLoadingMess,setIsLoadingMess] = useState('Loading...') // in the start

    const db_url_meals ="https://food-app-66f9f-default-rtdb.firebaseio.com/Meals.json"

    const getAllMeals = async ()=>{
      props.isLoading
      props.isLoadingMess
      try {
          const respons = await fetch(db_url_meals);
          const allmeals = await respons.json()
          const objValues = Object.values(allmeals)
          setMeals(objValues)
          setIsLoading(false)
          setIsLoading('')

      } catch (error) {
          console.log(errorMes)
      }
    }

    useEffect(()=>{
      getAllMeals()
    },[])
  return{

  }
}

