import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { useContacts } from "../Contexts/ContactsProvider";

function ContactsModal({ closeModal }) {
  const nameRef = useRef();
  const idRef = useRef();
  const { creatContact } = useContacts();

  function handelSubmit(e) {
    e.preventDefault();
    creatContact(idRef.current.value, nameRef.current.value);
    closeModal();
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Content
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handelSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef}></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={handelSubmit}>
          Login
        </Button>
        <Button variant="danger" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}

export default ContactsModal;
