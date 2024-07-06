import { Header } from "./components/Header.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.ts";
import WelcomeHeader from "./components/WelcomeHeader.tsx";
import NotLoggedIn from "./components/NotLoggedIn.tsx";
import { ModeProvider } from "./context/ModeProvider.tsx";
import Homepage from "./components/Homepage.tsx";
import { ExpensesProvider } from "./context/ExpensesProvider.tsx";
import { useState } from "react";

const App = () => {
  const [user] = useAuthState(auth);
  const [afterLogout, setAfterLogout] = useState(false);

  return (
    <ModeProvider>
      <Header setAfterLogout={setAfterLogout} />
      {user ? (
        <>
          <WelcomeHeader user={user} />
          <ExpensesProvider>
            <Homepage />
          </ExpensesProvider>
        </>
      ) : (
        <NotLoggedIn afterLogout={afterLogout} />
      )}
    </ModeProvider>
  );
};

export default App;
