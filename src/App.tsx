import Header from "./components/Header.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.ts";
import WelcomeHeader from "./components/WelcomeHeader.tsx";
import NotLoggedIn from "./components/NotLoggedIn.tsx";
import { ModeProvider } from "./context/ModeProvider.tsx";
import Homepage from "./components/Homepage.tsx";
import { ExpensesProvider } from "./context/ExpensesProvider.tsx";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <ModeProvider>
      <Header />
      {user ? (
        <>
          <WelcomeHeader user={user} />
          <ExpensesProvider>
            <Homepage />
          </ExpensesProvider>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </ModeProvider>
  );
};

export default App;
