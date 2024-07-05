import Header from "./components/Header.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.ts";
import WelcomeHeader from "./components/WelcomeHeader.tsx";
import NotLoggedIn from "./components/NotLoggedIn.tsx";

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Header />
      {user ? <WelcomeHeader user={user} /> : <NotLoggedIn />}
    </>
  );
};

export default App;
