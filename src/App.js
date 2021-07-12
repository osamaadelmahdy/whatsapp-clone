import Login from "./component/login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./component/dashboard";
import { ContactsProvider } from "./Contexts/ContactsProvider";
import { ConversationProvider } from "./Contexts/conversationProvider";

export default function App() {
  const [id, setId] = useLocalStorage("id");
  const dashboard = (
    <ContactsProvider>
      <ConversationProvider>
        <Dashboard id={id} />
      </ConversationProvider>
    </ContactsProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}
