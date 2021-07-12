import React, { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContacts } from "../Contexts/ContactsProvider";
import { useConversations } from "../Contexts/conversationProvider";
function ConversationModal({ closeModal }) {
  const nameRef = useRef();
  const idRef = useRef();
  const { contacts } = useContacts();
  const { creatConversation } = useConversations();

  const [selectedContactIds, setSelectedContactIds] = useState([]);
  console.log(selectedContactIds);

  function handelSubmit(e) {
    e.preventDefault();
    creatConversation(selectedContactIds);
    closeModal();
  }
  function handleCheckboxChange(id) {
    setSelectedContactIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((previd) => {
          return id !== previd;
        });
      } else {
        return [...prev, id];
      }
    });
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Content
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {contacts.map((contact) => (
          <Form.Group controlId={contact.id} key={contact.id}>
            <Form.Check
              type="checkbox"
              label={contact.name}
              value={selectedContactIds.includes(contact.id)}
              onChange={() => handleCheckboxChange(contact.id)}
            />
          </Form.Group>
        ))}
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

export default ConversationModal;
