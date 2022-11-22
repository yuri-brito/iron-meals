import { Card,Button,Table,Row,Col } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import './CardDetail.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-hot-toast'
import MealEdit from "./MealEdit/MealEdit";
const CardDetail = props => {

    const refeicao=props.refeicao
    const navigate=useNavigate()
    async function deleteRefeicao(){
        await axios.delete(`${props.apiURLuser}/${refeicao._id}`)
        props.setReload(!props.reload)
        navigate('/refeicoes')
        toast.success('Refeição excluída com sucesso!',{duration:5000}) 
    }
    
    function sumReducer(sum, val) {
        return sum + val;
    }

    function calcPortions(entry, qty) {
        return Math.round(((entry / 100) * qty)*10)/10
    }
    
    const sumQuantity = refeicao.itens.map(li => li.quantity).reduce(sumReducer, 0)
    const sumKcal = refeicao.itens.map(li => li.kcal).reduce(sumReducer, 0)
    const sumCarbs = refeicao.itens.map(li => li.carbs).reduce(sumReducer, 0)
    const sumProtein = refeicao.itens.map(li => li.protein).reduce(sumReducer, 0)
    const sumLipids = refeicao.itens.map(li => li.lipids).reduce(sumReducer, 0)
    const sumFiber = refeicao.itens.map(li => li.fiber).reduce(sumReducer, 0)
    const sumSodium = refeicao.itens.map(li => li.sodium).reduce(sumReducer, 0)
    
 
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
                            <th>Kcal</th>
                            <th>Carboidratos</th>
                            <th>Proteínas</th>
                            <th>Lipídios</th>
                            <th>Fibras</th>
                            <th>Sódio</th>
                            
                        </tr>
                    </thead>
                    <tbody className="detailTbody scrollbar-primary">
                    {refeicao.itens.map((item,index)=>{return(
                        <tr key={index}>
                            <td className="align-middle">{item.label}</td>
                            <td className="align-middle">{item.quantity}g</td>
                            <td className="align-middle">{ calcPortions(item.kcal, item.quantity) }</td>
                            <td className="align-middle">{ calcPortions(item.carbs, item.quantity)}g</td>
                            <td className="align-middle">{ calcPortions(item.protein, item.quantity) }g</td>
                            <td className="align-middle">{ calcPortions(item.lipids, item.quantity) }g</td>
                            <td className="align-middle">{ calcPortions(item.fiber, item.quantity) }g</td>
                            <td className="align-middle">{ calcPortions(item.sodium, item.quantity) }mg</td>                          
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
                                 <b>    {/*Quantidade total */}
                                {sumQuantity}g
                                </b>
                            </td>
                            <td>
                                 <b>    {/*Kcal total */}
                                {sumKcal}
                                </b>
                            </td>
                            <td>
                                 <b>    {/*Carboidratos total */}
                                {sumCarbs}g
                                </b>
                            </td>
                            <td>
                                 <b>    {/*Proteínas total */}
                                {sumProtein}g
                                </b>
                            </td>
                            <td>
                                 <b>    {/*Lipídios total */}
                                {sumLipids}g
                                </b>
                            </td>
                            <td>
                                 <b>    {/*Fibras total */}
                                {sumFiber}g
                                </b>
                            </td>
                            <td>
                                 <b>    {/*Sódio total */}
                                {sumSodium}mg
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
                    <Link to={'/refeicoes'}>
                        <Button variant="secondary"><i className="bi bi-arrow-return-left"></i>   Voltar</Button>                        
                    </Link>
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