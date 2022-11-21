import { useState } from "react";
import axios from "axios"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import Select from 'react-select';
import itens from "../../foods-db.json"


const ModalAdd = (props, apiURLuser) => {

    const [food, setFood] = useState([
        {itemId: ""}
    ]);

    const [quant, setQuant] = useState([
        {quantity: ""}
    ]);

    //testado    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    //API não está configurada ainda
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {            
            //await axios.post(apiURLuser, form)            
            setShow(false)
            
        } catch (error) {            
            console.log(error)            
        }
    };
    
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
    
    // const [item, setItem] = useState({
    //     id: "", 
    //     label: "", 
    //     kcal: "", 
    //     protein: "", 
    //     lipids: "", 
    //     carbs: "", 
    //     fiber: "", 
    //     sodium: "",
    //     quantity: ""
    // })

    

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
        
        console.log(meal)

    


    return (
        <div>
            <Button variant="primary" onClick={ handleShow }>
                cadastrar refeição
            </Button>

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
                                <Col className="d-flex justify-content-center align-items-center">
                                    <Form.Group className="mtb-3">
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
                            <div key={index}>
                            <Row>
                                <Col>
                                    <Form.Group className="mtb-3">
                                    <Form.Label>Selecione um item</Form.Label>
                                        <Select
                                            value={obj}
                                            style={{textAlign: "left"}}
                                            options={itens}                                                                                                                                    
                                            // isClearable={true}
                                            isSearchable={true}
                                            name="item"                                            
                                            onChange={ (e) => handleChange(e, index) }
                                            
                                            // capturar o value
                                        />

                                        {/* <Form.Select name="itemId" 
                                        onChange={(e) => handleChangeFood(e, index) }
                                        >
                                            <option value="0">Selecione um item...</option>
                                            {itens.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </Form.Select>                                         */}
                                    </Form.Group>
                                </Col>
                                <Col className="col-3">
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
                                <Col className="col-2">
                                   {meal.itens.length > 1 && 
                                    <Button 
                                        className="mt-3" 
                                        variant="danger"
                                        onClick={(e) => handleRemove(e, index)}>
                                        Remover
                                        </Button>} 
                                </Col>
                            </Row>                                                     
                            </div>

                        )
                    })}
                            <Button 
                                className="m-3" 
                                variant="light" 
                                onClick={ handleAdd }
                                >
                                    Adicionar item
                            </Button>

                            <Button className="mt-4" variant="success" type="submit">Salvar refeição</Button>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={ handleClose }>Sair sem salvar</Button>                
                </Modal.Footer>
            </Modal>

        </div>
    );
};


export default ModalAdd;