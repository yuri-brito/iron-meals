import {Spinner} from 'react-bootstrap'
import './SpinnerImage.css'
import logo from '../assets/logo.png'
const SpinnerImage = props => {
    return (
        <div className='divSpinner'>
            <img className='loader' width={30}src={logo} alt='logo'/>
            <span className='loaderText'>Loading...</span>
        </div>
        // <Spinner variant='primary' animation="border" role="status"></Spinner>
                              
    );
};



export default SpinnerImage;