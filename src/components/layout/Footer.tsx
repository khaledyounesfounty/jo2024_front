import React from "react";
import { Box, Typography, Link as MuiLink, Divider } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        mt: 8,
        py: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Olympic Games Organization
      </Typography>
      {/* Todo : voir la separation entre les deux ligne */}
      {/* <Divider orientation="vertical" flexItem /> */}
      <Typography variant="body2">
        <MuiLink href="#" color="inherit">
          Privacy Policy
        </MuiLink>
        {" | "}
        <MuiLink href="#" color="inherit">
          Terms of Use
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;
