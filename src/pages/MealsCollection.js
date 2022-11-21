import SpinnerImage from "../components/SpinnerImage";
import NavBar from "../components/NavBar";
import { Container, Row } from "react-bootstrap";
import CardAddMeal from "../components/CardAddMeal";
import MealCard from "../components/MealCard";
import axios from "axios";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";
const MealsCollection = props => {
    const[refeicoes,setRefeicoes]=useState({})
    const[isLoading,setIsLoading]=useState(true)
    async function fetchingUser(){
        try {
          
          const response= await axios.get(props.apiURLuser)
          // const tempo = (ms)=>{return new Promise(resolve =>setTimeout(resolve,ms))}
          // await tempo(3000)
          setRefeicoes(response.data)
          setIsLoading(false)
        } catch (error) {
          console.log(error) 
          toast.error('Algo deu errado. Tente novamente!')  
        }
      }  
      useEffect(()=>{
        fetchingUser();
      },[])
    return (
        <Container>
            <NavBar/>
            {isLoading?<SpinnerImage />:
            <Container>
                <Row>
                    <CardAddMeal/>
                    {refeicoes.map((refeicao)=>{return(
                        <MealCard key={refeicao._id} refeicao={refeicao} />
                    )})}
                </Row>
            </Container>
            }
        </Container>
    );
};

export default MealsCollection;