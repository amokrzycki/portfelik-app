import { Box, Typography } from "@mui/material";
import { User } from "firebase/auth";

interface WelcomeHeaderProps {
  user: User;
}

function WelcomeHeader({ user }: WelcomeHeaderProps) {
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
      <Typography variant="h4">Witaj, {user.displayName}!</Typography>
    </Box>
  );
}

export default WelcomeHeader;
