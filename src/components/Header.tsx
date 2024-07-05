import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.ts";
import Logout from "./Logout.tsx";
import Login from "./Login.tsx";
import { AppBar, Box, Typography } from "@mui/material";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "green",
          color: "#fff",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
          flexDirection: "row",
        }}
      >
        <Typography variant="h5">Portfelik</Typography>
        {user ? <Logout /> : <Login />}
      </AppBar>
    </Box>
  );
}

export default Header;
