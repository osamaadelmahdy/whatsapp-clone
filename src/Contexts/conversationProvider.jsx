import React, { useContext, useState, useCallback, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const CoversationContext = React.createContext();

export function useConversations() {
  return useContext(CoversationContext);
}
function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}

export function ConversationProvider({ id, children }) {
  const { contacts } = useContacts();
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const socket = useSocket();
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  function creatConversation(ids) {
    setConversations((prev) => {
      return [...prev, { ids, messages: [] }];
    });
  }
  const addMessageToConversation = useCallback(
    ({ ids, text, sender }) => {
      setConversations((prevConversations) => {
        console.log("addmessage", ids, text, sender, prevConversations);
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          console.log(conversation.ids, ids);
          if (arrayEquality(conversation.ids, ids)) {
            madeChange = true;
            console.log("o", conversation.messages, ids, newMessage);
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { ids, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", ({ newIds, sendr, text }) => {
      console.log("socket add message", newIds, sendr, text);
      addMessageToConversation({ ids: newIds, text, sendr });
    });
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);
  function sendMessage(ids, text) {
    socket.emit("send message", { ids, text });
    console.log("oo", ids);
    addMessageToConversation({ ids, text, sender: id });
  }

  const formattedConversation = conversations.map((conversation, index) => {
    console.log(conversation);
    const ids = conversation.ids.map((ids) => {
      const contact = contacts.find((contact) => {
        return contact.id === ids;
      });
      const name = (contact && contact.name) || ids;

      return { id: ids, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;

      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, ids, selected };
  });
  return (
    <CoversationContext.Provider
      value={{
        conversations: formattedConversation,
        selectedConversation: formattedConversation[selectedConversationIndex],
        setSelectedConversationIndex,
        sendMessage,
        creatConversation,
      }}
    >
      {children}
    </CoversationContext.Provider>
  );
}
