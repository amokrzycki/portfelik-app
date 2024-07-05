import { signOut } from "../services/authService";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button } from "@mui/material";

function Logout() {
  return (
    <Box>
      <Button
        onClick={signOut}
        startIcon={<LogoutIcon sx={{ color: "#000" }} />}
        sx={{ color: "#000" }}
      >
        Wyloguj się
      </Button>
    </Box>
  );
}

export default Logout;
