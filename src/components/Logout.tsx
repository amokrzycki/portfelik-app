import { signOut } from "../services/authService";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button } from "@mui/material";

interface LogoutProps {
  setAfterLogut: (value: boolean) => void;
}

function Logout({ setAfterLogut }: LogoutProps) {
  const handleLogout = () => {
    setAfterLogut(true);
    signOut();
  };

  return (
    <Box>
      <Button
        onClick={handleLogout}
        startIcon={<LogoutIcon sx={{ color: "#000" }} />}
        sx={{ color: "#000" }}
      >
        Wyloguj się
      </Button>
    </Box>
  );
}

export default Logout;
