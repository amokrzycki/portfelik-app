import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.ts";
import Logout from "./Logout.tsx";
import Login from "./Login.tsx";
import { AppBar, Box, Typography } from "@mui/material";
import ModeSwitcher from "./ModeSwitcher.tsx";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          bgcolor: "primary.main",
          color: "text.primary",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
          flexDirection: "row",
        }}
      >
        <Typography variant="h5">Portfelik</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ModeSwitcher />
          {user ? <Logout /> : <Login />}
        </Box>
      </AppBar>
    </Box>
  );
}

export default Header;
