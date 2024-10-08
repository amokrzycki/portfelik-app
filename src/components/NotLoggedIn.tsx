import { Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Login from "./Login.tsx";
import LogoutScreen from "./LogoutScreen.tsx";

interface NotLoggedInProps {
  afterLogout: boolean;
}

function NotLoggedIn({ afterLogout }: NotLoggedInProps) {
  if (afterLogout) {
    return <LogoutScreen />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "2rem",
        gap: "1rem",
        animation: "pulse 1s infinite alternate",
        "@keyframes pulse": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: 60, color: "action.active" }} />
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Zaloguj się
      </Typography>
      <Typography variant="subtitle1">
        Proszę zaloguj się, aby kontynuować.
      </Typography>
      <Login />
    </Box>
  );
}

export default NotLoggedIn;
