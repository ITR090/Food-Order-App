import { Header } from './components/header/Header'
import { Meals } from './components/Meals'
import {MealsSummary} from './components/SummaryMeals'
import {CartContextProvider} from './components/myContext/Cart-Context'
// import {AvailableMeals} from '../src/AvailableMeals'
function App() {

  //const [meals]= useState(DUMMY_MEALS) 
  return (
    <>
      <CartContextProvider>
        <Header />
        <main>
        <MealsSummary/>
        </main>
        <Meals />
      </CartContextProvider>
    </>
  );
}

export default App;
