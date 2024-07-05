import Header from "./components/Header.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.ts";
import WelcomeHeader from "./components/WelcomeHeader.tsx";
import NotLoggedIn from "./components/NotLoggedIn.tsx";
import { ModeProvider } from "./providers/ModeProvider.tsx";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <ModeProvider>
      <Header />
      {user ? <WelcomeHeader user={user} /> : <NotLoggedIn />}
    </ModeProvider>
  );
};

export default App;
