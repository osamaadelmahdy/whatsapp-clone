import React from "react";
import { useConversations } from "../Contexts/conversationProvider";
import { ListGroup } from "react-bootstrap";

function Conversation() {
  const { conversations, setSelectedConversationIndex } = useConversations();
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => setSelectedConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.ids.map((id) => id.name).join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Conversation;
