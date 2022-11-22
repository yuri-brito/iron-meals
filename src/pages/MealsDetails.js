import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import SpinnerImage from "../components/SpinnerImage";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import CardDetail from "../components/CardDetail";
import toast from 'react-hot-toast'
const MealsDetails = props => {
    const[refeicao,setRefeicao]=useState()
    const[isLoading,setIsLoading]=useState(true)
    const {id}=useParams()
    async function fetchingRefeicao(){
        try {
          
          const response= await axios.get(`${props.apiURLuser}/${id}`)
        //   const tempo = (ms)=>{return new Promise(resolve =>setTimeout(resolve,ms))}
        //   await tempo(3000)
          setRefeicao(response.data)
          setIsLoading(false)
        } catch (error) {
          console.log(error) 
          toast.error('Algo deu errado. Tente novamente!')  
        }
      }  
      useEffect(()=>{
        fetchingRefeicao();
      },[id,props.reload])
    return (
        <div>
            <Container>
            <NavBar/>
            {isLoading?<SpinnerImage />:
                <CardDetail refeicao={refeicao} apiURLuser={props.apiURLuser} setReload={props.setReload} reload={props.reload}/> 
            }
            </Container>
            
        </div>
    );
};
export default MealsDetails;