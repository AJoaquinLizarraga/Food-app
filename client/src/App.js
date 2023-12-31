import './App.css';
import{Route,Routes} from 'react-router-dom' 
import LandingPage from './components/Landing/LandingPage'
import Home from './components/Home/Home';
import RecipeCreate from './components/Create/RecipeCreate';
import Details from './components/Details/Details';
import { useEffect } from 'react';
import { getRecipes, getTypeDiets } from './Redux/actions';
import { useDispatch } from 'react-redux';


function App() {
  /* DISPATCH DE LAS RECETAS DE HOME, SE MONTA AL INICIO*/
 const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getTypeDiets());
  }, [dispatch]);

  return (
    
    <div className="App">
      <Routes>
        <Route path = '/' element = {<LandingPage />}/>
        <Route  path = '/home' element = {<Home />}/>
        <Route path ='/recipes/:id' element={<Details />}/>
        <Route path ='/recipe' element={<RecipeCreate />}/>
      </Routes>
    </div>
    
  );
}

export default App;
