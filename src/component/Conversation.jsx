import React from "react";
import { useConversations } from "../Contexts/conversationProvider";
import { ListGroup } from "react-bootstrap";

function Conversation() {
  const { conversations } = useConversations();
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item key={index}>
          {conversation.ids.map((id) => id.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Conversation;
