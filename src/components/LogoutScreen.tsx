import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function LogoutScreen() {
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
      <ThumbUpIcon sx={{ fontSize: 60, color: "action.active" }} />
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Wylogowano pomyślnie!
      </Typography>
    </Box>
  );
}

export default LogoutScreen;
