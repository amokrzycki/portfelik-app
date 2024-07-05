import { signInWithGoogle } from "../services/authService";
import { Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

function Login() {
  return (
    <Box>
      <Button
        onClick={signInWithGoogle}
        startIcon={<LoginIcon sx={{ color: "#000" }} />}
        sx={{ color: "#000" }}
      >
        Zaloguj się przy pomocy Google
      </Button>
    </Box>
  );
}

export default Login;
