import Login from "./component/login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./component/dashboard";
import { ContactsProvider } from "./Contexts/ContactsProvider";
import { ConversationProvider } from "./Contexts/conversationProvider";
import {SocketProvider} from "./Contexts/SocketProvider";

export default function App() {
  const [id, setId] = useLocalStorage("id");
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}
