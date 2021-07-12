import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

const CoversationContext = React.createContext();

export function useConversations() {
  return useContext(CoversationContext);
}

export function ConversationProvider({ children }) {
  const { contacts } = useContacts();
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  function creatConversation(ids) {
    setConversations((prev) => {
      return [...prev, { ids, massages: [] }];
    });
  }
  const formattedConversation = conversations.map((conversation) => {
    console.log(conversations);
    const ids = conversation.ids.map((ids) => {
      const contact = contacts.find((contact) => {
        return contact.id === ids;
      });
      const name = (contact && contact.name) || ids;
      console.log("name", name);
      return { id: ids, name };
    });
    console.log("conversations", conversation);
    console.log("ids", ids);
    console.log({ ...conversation, ids });
    return { ...conversation, ids };
  });
  return (
    <CoversationContext.Provider
      value={{ conversations: formattedConversation, creatConversation }}
    >
      {children}
    </CoversationContext.Provider>
  );
}
