// Layout.tsx
import React from 'react';

import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom'; // Outlet component is used to render child routes
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flex: 1, py: 2 }}>
        <Outlet /> {/* This is where child routes will be rendered */}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
