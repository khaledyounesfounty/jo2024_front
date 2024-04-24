// src/components/layout/Footer.tsx
import React from 'react';
import { Box, Typography, Container, Link as MuiLink } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', mt: 8, py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="body1">
          © {new Date().getFullYear()} Olympic Games Organization
        </Typography>
        <Typography variant="body2">
          <MuiLink href="#" color="inherit">
            Privacy Policy
          </MuiLink>
          {' | '}
          <MuiLink href="#" color="inherit">
            Terms of Use
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
