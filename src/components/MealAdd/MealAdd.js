import { useState } from "react";
import axios from "axios"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import Select from 'react-select';
import itens from "../../foods-db.json"
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

const MealAdd = (props) => {
    const navigate=useNavigate()

    const [meal, setMeal] = useState({
        title: "",        
        itens: [
            {
                id: "", 
                label: "", 
                kcal: "", 
                protein: "", 
                lipids: "", 
                carbs: "", 
                fiber: "", 
                sodium: "",
                quantity: ""
            }
        ]
    })

    //testado    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    //API não está configurada ainda
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(meal.title===''){
            toast.error('Selecione uma opção de refeição!')
            return
        }
        for (let item of meal.itens){
            
            if(item.id===''){
                toast.error('Campo item vazio!')
            return
            }
            if(item.quantity==='' || item.quantity===0){
                toast.error('Campo Quantidade vazio!')
            return
            }
        }
        if(meal.itens.length===0){
            toast.error('Selecione pelo menos um item!')
            return

        }
        try {            
            await axios.post(props.apiURLuser, meal)            
            setShow(false)
            props.setReload(!props.reload)
            setMeal({
                title: "",        
                itens: [
                    {
                        id: "", 
                        label: "", 
                        kcal: "", 
                        protein: "", 
                        lipids: "", 
                        carbs: "", 
                        fiber: "", 
                        sodium: "",
                        quantity: ""
                    }]})
                 
            toast.success('Refeição incluída com sucesso!',{duration:4000})

            navigate('/refeicoes')
            
        } catch (error) {            
            console.log(error)
            toast.error('Algo deu errado. Tente novamente mais tarde!',{duration:4000})            
        }
    };

    const handleAdd = () => {            
            const tempMeal = {
                id: "", 
                label: "", 
                kcal: "", 
                protein: "", 
                lipids: "", 
                carbs: "", 
                fiber: "", 
                sodium: "",
                quantity: ""
            }            
            setMeal({...meal, itens: [...meal.itens, tempMeal ]})    
    }
    
    const handleRemove = (e, index) => {
        const remove = meal.itens.splice(index, 1)        
        
        setMeal({...meal, itens: meal.itens})        
    }    
    

    const handleChange = (e, index) => {
        
            if(e.target == undefined) {
                const tempMeal = meal.itens
                tempMeal[index].id = e.id
                tempMeal[index].label = e.label
                tempMeal[index].kcal = e.kcal
                tempMeal[index].protein = e.protein
                tempMeal[index].carbs = e.carbs
                tempMeal[index].fiber = e.fiber
                tempMeal[index].sodium = e.sodium
                tempMeal[index].lipids = e.lipids

                setMeal({...meal, itens: tempMeal})                
                
            } else {

                if(e.target.name === "title") {
                    setMeal({...meal, [e.target.name]: e.target.value})

                    
                } 

                if (e.target.name === "quantity"){
                    const tempMeal = meal.itens
                    tempMeal[index].quantity = Number(e.target.value)
                    setMeal({...meal, itens: tempMeal})
                    
                    
                }                                
            }
        }     
    
    return (
        <div>
            <Button variant="outline-primary" onClick={handleShow}><i className="bi bi-clipboard2-plus"></i>  Adicionar</Button>

            <Modal
                show={show}
                onHide={ handleClose }
                size="lg"                
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Cadastrar nova refeição</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form onSubmit={ handleSubmit }>
                            <Row>

                                <Col className="d-flex justify-content-start align-items-center">
                                    <Form.Group className="ms-3 mb-3">

                                        <Form.Label>Selecione a Refeição</Form.Label>
                                        <Form.Select name="title" onChange={ handleChange }>
                                            <option value="0">Selecione uma opção</option>
                                            <option value="breakfast">Café da Manhã</option>
                                            <option value="lunch">Almoço</option>
                                            <option value="snacks">Lanche</option>
                                            <option value="dinner">Jantar</option>                                                
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                    
                    {meal.itens.map((obj, index) => {                        
                        return (

                            <Row key={index}>
                                <Col className="ms-3 mt-2">
                                    <Form.Group className="mtb-3">
                                    <Form.Label>Selecione um item</Form.Label>
                                        <Select
                                            className="basic-single"
                                            value={obj}
                                            style={{textAlign: "left"}}
                                            options={itens}                           
                                            isClearable={true}
                                            isSearchable={true}
                                            placeholder="Selecione um item"
                                            name="item"
                                            onChange={ (e) => handleChange(e, index) }                                            
                                            // capturar o value
                                        />

                                    </Form.Group>
                                </Col>
                                <Col className="col-3 ms-3 mt-2">
                                  <Form.Group className="mtb-3">
                                      <Form.Label>Quantidade</Form.Label>
                                      <Form.Control
                                          type="number"
                                          placeholder="em (g) gramas"
                                          name="quantity"
                                          // value={form.quantity}
                                          onChange={(e) => handleChange(e, index) }
                                          value={obj.quantity}
                                      />
                                  </Form.Group>
                                </Col>

                                <Col className="col-2 d-flex justify-content-center align-items-end">
                                   {meal.itens.length > 1 && 
                                    <Button 
                                        variant="danger"
                                        onClick={(e) => handleRemove(e, index)}>
                                        <i className="bi bi-trash3"></i>   Excluir
                                        </Button>} 
                                </Col>
                            </Row>                                                    

                        )
                    })}
                            <Row>
                                <Col>
                                    <Button 
                                        className="m-3" 
                                        variant="light" 
                                        onClick={ handleAdd }
                                        ><i className="bi bi-clipboard2-plus"></i>   Adicionar item
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col className="col-md-6 text-center">
                                <Button className="col-6 " variant="success" type="submit"onClick={handleSubmit}><i className="bi bi-download"></i>   Salvar refeição</Button>
                            </Col>
                            <Col className="col-md-6 text-center">
                                <Button variant="secondary" onClick={ handleClose }><i className="bi bi-x-square"></i>   Cancelar</Button>                
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>

        </div>
    );
};



export default MealAdd;
