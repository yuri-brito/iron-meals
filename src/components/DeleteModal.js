import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
function DeleteModal(props) {
  const [show, setShow] = useState(false);
  const navigate=useNavigate()
  const handleClose = (e) => {
    setShow(false)
    if (e.target.innerHTML==='Sim'){
        props.deleteRefeicao()  
           
    }
};
  const handleShow = () => setShow(true);

  return (
    <>
      <Button  variant="danger" onClick={handleShow}><i className="bi bi-trash3"></i> Excluir Refeição</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja realmente excluir a refeição?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esse procedimento é irreversível!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Sim
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;