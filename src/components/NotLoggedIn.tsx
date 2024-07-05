import { Box, Typography } from "@mui/material";

function NotLoggedIn() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "2rem",
      }}
    >
      <Typography variant="h4">Zaloguj się</Typography>
    </Box>
  );
}

export default NotLoggedIn;
