import{Card, Button} from 'react-bootstrap'
import logo from '../assets/logo.png'
const CardAddMeal = props => {

    return (
        <Card style={{ width: '15rem',height:'20rem' ,boxShadow:'0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',borderRadius:20,margin:30,animation:'fadein 1.5s' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body style={{display:'flex', alignItems:'center',justifyContent:'space-between',flexDirection:'column',alignContent:'center'}}>
                <Card.Title style={{color:'rgba(0,0,0,0.6)'}}>Nova Refeição</Card.Title>
                <Card.Img variant="top" src={logo} style={{width:150,opacity:'0.4'}} />
                <Button variant="outline-primary"><i className="bi bi-clipboard2-plus"></i>  Adicionar</Button>
            </Card.Body>
        </Card>
        
    );
};

export default CardAddMeal;