import { Card,Button,Table,Row,Col } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import './CardDetail.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-hot-toast'
import MealEdit from "./MealEdit/MealEdit";
const CardDetail = props => {
    const refeicao=props.refeicao
    const navigate=useNavigate()
    async function deleteRefeicao(){
        await axios.delete(`${props.apiURLuser}/${refeicao._id}`)
        navigate('/refeicoes')
        toast.success('Refeição excluída com sucesso!',{duration:5000}) 
    }
    return (
        <Card style={{boxShadow:'0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',borderRadius:20,margin:30 ,animation:'fadein 1.5s'}}>

                {props.refeicao.title==='breakfast'&&
                    <Card.Header><h3>Café da Manhã</h3></Card.Header>
                }
                {props.refeicao.title==='lunch'&&
                    <Card.Header><h3>Almoço</h3></Card.Header>
                }
                {props.refeicao.title==='snacks'&&
                    <Card.Header><h3>Lanche</h3></Card.Header>
                }
                {props.refeicao.title==='dinner'&&
                    <Card.Header><h3>Jantar</h3></Card.Header>
                }
            
            <Card.Body>
                {/* <Card.Title>Special title treatment</Card.Title> */}
                <Table responsive size='sm' hover>
                    <thead>
                        <tr style={{backgroundColor:'rgba(0,0,0,0.1)'}}>
                            <th>Item</th>
                            <th>Quantidade</th>
                            
                        </tr>
                    </thead>
                    <tbody className="detailTbody scrollbar-primary">
                    {refeicao.itens.map((item,index)=>{return(
                        <tr key={index}>
                            <td className="align-middle">{item.label}</td>
                            <td className="align-middle">{item.quantity}g</td>
                        </tr>
                    )
                    })}

                    </tbody>
                    <tfoot>
                        <tr style={{backgroundColor:'rgba(0,0,0,0.1)'}}>
                            <td>
                                <b>Total</b>
                            </td>
                            <td>
                                <b>
                                {refeicao.itens.reduce((accumulator,currentValue)=>accumulator+currentValue.qtd ,0)}g
                                </b>
                            </td>
                                
                        </tr>

                    </tfoot>
                    
                </Table>
                
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <MealEdit apiURLuser={props.apiURLuser} id={refeicao._id} reload={props.reload} setReload={props.setReload} />
                    </Col>
                    <Col>
                        <DeleteModal deleteRefeicao={deleteRefeicao}/>
                    </Col>
                </Row>
            </Card.Footer>
         </Card>
    );
};

export default CardDetail;