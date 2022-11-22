import{Card} from 'react-bootstrap'
import logo_ from '../assets/logo_.png'
import { useEffect, useState } from 'react';
const ResumeCard = props => {
    const [resumo, setResumo]=useState([])
    let somaCarbs=0
    let somaKcal=0
    let somaLipids=0
    let somaSodium=0
    let somaProtein=0
    let somaFiber=0
    async function calcResumo(){
      await props.refeicoes.map((refeicao)=>{
            refeicao.itens.map((item)=>{
                somaCarbs+=item.carbs*item.quantity/100
                somaKcal+=item.kcal*item.quantity/100
                somaLipids+=item.lipids*item.quantity/100
                somaSodium+=item.sodium*item.quantity/100
                somaProtein+=item.protein*item.quantity/100
                somaFiber+=item.fiber*item.quantity/100
            })
        })
        // for(let refeicao of props.refeicoes){
        //     for(let item of refeicao.itens){
        //     }
        // }
        setResumo([{'soma':somaCarbs,'name':'Carboidratos'},
                    {'soma':somaKcal,'name':'Kcal'},{'soma':somaLipids,'name':'Lipídios'},{'soma':somaSodium,'name':'Sódio'},{'soma':somaProtein,'name':'Protínas'},{'soma':somaFiber,'name':'Fibra'}])
        props.setReload(!props.reload)
    }
    useEffect(()=>{
        calcResumo()

    },[])
    console.log(resumo)
    return (
        <Card style={{ width: '15rem',height:'20rem' ,boxShadow:'0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',borderRadius:20,margin:30,animation:'fadein 1.5s' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body style={{display:'flex', alignItems:'center',justifyContent:'space-between',flexDirection:'column',alignContent:'center',backgroundImage:`url(${logo_})`,backgroundSize:'200px',backgroundRepeat:'no-repeat', backgroundPositionY:'center',backgroundPositionX:'center'}}>
                <Card.Title style={{color:'rgba(0,0,0,0.6)'}}>Resumo de Calorias</Card.Title>
                {resumo.map((cadaSoma,index)=>{
                    
                 return(
                    <Card.Text key={index}>
                        <strong>{cadaSoma.name}</strong> - {Math.round(cadaSoma.soma)}g

                    </Card.Text>
                 )   
                })}
               
            </Card.Body>
        </Card>
        
    );
};

export default ResumeCard;