
import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MealsCollection from './pages/MealsCollection';
import MealsDetails from './pages/MealsDetails';
import ErrorPage from './pages/ErrorPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast ,{Toaster} from 'react-hot-toast'
function App() {
  const apiURLuser='https://ironrest.herokuapp.com/iron-meals-users'
  const apiURLdb='https://ironrest.herokuapp.com/iron-meals-db'
  const[itens, setItens]=useState([])
  
  
  async function fetchingdb(){
    try {
      const response= await axios.get(apiURLdb)
      // const tempo = (ms)=>{return new Promise(resolve =>setTimeout(resolve,ms))}
      // await tempo(5000)
      setItens(response.data)
     
    } catch (error) {
      console.log(error)
      toast.error('Algo deu errado. Tente novamente!')   
    }
  }  
  useEffect(()=>{
    fetchingdb();
  },[])
 
  return (
    <div className="App">
      <Toaster/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/refeicoes' element={<MealsCollection itens={itens} apiURLuser={apiURLuser} />}/>
        <Route path='/refeicoes/:id' element={<MealsDetails itens={itens} apiURLuser={apiURLuser} />}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>

      
    </div>
  );
}

export default App;