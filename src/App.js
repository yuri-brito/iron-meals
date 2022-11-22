
import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MealsCollection from './pages/MealsCollection';
import MealsDetails from './pages/MealsDetails';
import ErrorPage from './pages/ErrorPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast ,{Toaster} from 'react-hot-toast'
import itens from'./foods-db.json'
function App() {
  const apiURLuser='https://ironrest.herokuapp.com/iron-meals-users'
  const[refeicoes,setRefeicoes]=useState({})
  const[isLoading,setIsLoading]=useState(true)
  const[reload,setReload]=useState(true)
  async function fetchingUser(){
      try {
        
        const response= await axios.get(apiURLuser)
        // const tempo = (ms)=>{return new Promise(resolve =>setTimeout(resolve,ms))}
        // await tempo(3000)
        const reserved=response.data.reverse()
        setRefeicoes(reserved)
        setIsLoading(false)
      } catch (error) {
        console.log(error) 
        toast.error('Algo deu errado. Tente novamente!')  
      }
    }  
    useEffect(()=>{
      fetchingUser();
    },[reload])

  return (
    <div className="App">
      <Toaster/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/refeicoes' element={<MealsCollection itens={itens} apiURLuser={apiURLuser} reload={reload} setReload={setReload} refeicoes={refeicoes} setRefeicoes={setRefeicoes} isLoading={isLoading} setIsLoading={setIsLoading} />}/>
        <Route path='/refeicoes/:id' element={<MealsDetails itens={itens} apiURLuser={apiURLuser} reload={reload} setReload={setReload} />}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>

      
    </div>
  );
}

export default App;