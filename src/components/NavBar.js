import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import './NavBar.css'
import {Toaster} from 'react-hot-toast'
function NavBar(props) {

  return (
    <Navbar key={false} bg='light'  expand={false} className="mb-3" style={{boxShadow:'0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',borderRadius:'12px'}}>
        <Container fluid style={{marginLeft:50,marginRight:50}}>
            <Link to={'/refeicoes'} style={{textDecoration:'none',color:'rgba(0,0,0,0.6)'}}>
                <img src={logo} alt='logo' width={65}/>
                <h4 style={{display:'inline',marginLeft:10}}><b>Iron Meals</b></h4>
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`}/>
            {/* <Toaster position="top-center" reverseOrder={true}/> */}
            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${false}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                placement="end" style={{boxShadow:'0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)', borderRadius:12}} >
                <Offcanvas.Header closeButton closeVariant='white'  style={{backgroundColor:'rgba(13, 110, 253, 255)',boxShadow:'0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)', borderRadius:12, color:'white'}}>
                <Offcanvas.Title  id={`offcanvasNavbarLabel-expand-${false}`} >
                    Menu
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link to={'/refeicoes'} style={{textDecoration:'none',color:'grey',marginTop:10}}>
                        <div className='onHover'>
                            <i className="bi bi-house-door-fill"></i>  Home
                        </div>
                    </Link>
                    <Link to={'/refeicoes'} style={{textDecoration:'none',color:'grey',marginTop:10}}>
                    <div className='onHover'>
                        <i className="bi bi-cup-straw"></i>  Refeições    
                    </div>
                    </Link>
                    <Link to={'/refeicoes'} style={{textDecoration:'none',color:'grey',marginTop:10}}>
                    <div className='onHover'>
                        <i className="bi bi-box-arrow-right"></i>   Logout
                    </div>
                        
                    </Link>
                </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            
        </Container>
      </Navbar>
   
  );
}

export default NavBar;