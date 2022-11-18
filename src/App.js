
import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MealsCollection from './pages/MealsCollection';
import MealsDetails from './pages/MealsDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const apiURLuser='https://ironrest.herokuapp.com/iron-meals-users'
  const apiURLdb='https://ironrest.herokuapp.com/iron-meals-db'
  const[itens, setItens]=useState([])
  
  async function fetchingdb(){
    try {
      const response= await axios.get(apiURLdb)
      setItens(response.data)
    } catch (error) {
      console.log(error)   
    }
  }  

  useEffect(()=>{
    fetchingdb();
  },[])
 
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage  />}/>
        <Route path='/refeicoes' element={<MealsCollection itens={itens} apiURLuser={apiURLuser} />}/>
        <Route path='/refeicoes/:id' element={<MealsDetails itens={itens} apiURLuser={apiURLuser} />}/>
      </Routes>

      
    </div>
  );
}

export default App;
