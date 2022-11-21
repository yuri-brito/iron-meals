
import logo from '../assets/logo.png'
import {Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
const HomePage = props => {
    return (
        <Container>
            <Link to={'/refeicoes'} style={{textDecoration:'none',color:'black'}}>
                <img className='logoInicial' src={logo} alt='logo' width={300}/>
                <h3>Iron Meals</h3>
            </Link>
        </Container>
    );
};

export default HomePage;