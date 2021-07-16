import React from "react";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";
import { useConversations } from "../Contexts/conversationProvider";

function Dashboard({ id }) {
  const { selectedConversation } = useConversations();
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation ? <OpenConversation /> : "Select Conversation"}
    </div>
  );
}

export default Dashboard;
