import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  function creatContact(id, name) {
    setContacts((prev) => {
      return [...prev, { id, name }];
    });
  }
  return (
    <ContactsContext.Provider value={{ contacts, creatContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
