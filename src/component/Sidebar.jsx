import React from "react";
import { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversation from "./Conversation";
import Contacts from "./Contacts";
import ConversationModal from "./ConversationModal";
import ContactsModal from "./ContactsModal";

function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState("conversation");
  const [modalOpen, setModalOpen] = useState(false);

  function handleClose() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="conversation">conversation</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contacts">contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey="conversation">
            <Conversation />
          </Tab.Pane>
          <Tab.Pane eventKey="contacts">
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="border-top border-right p-2">Your id is: {id}</div>
        {activeKey === "conversation" ? (
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            conversation
          </Button>
        ) : (
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            contacts
          </Button>
        )}
      </Tab.Container>
      <Modal show={modalOpen} onHide={handleClose}>
        {activeKey === "conversation" ? (
          <ConversationModal closeModal={handleClose} />
        ) : (
          <ContactsModal closeModal={handleClose} />
        )}
      </Modal>
    </div>
  );
}

export default Sidebar;
