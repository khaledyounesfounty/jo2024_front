// src/pages/HomePage.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <Box sx={{ padding: 4, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                Welcome to the 2024 Olympic Games!
            </Typography>
            <Typography variant="h5" gutterBottom>
                Explore the spirit of the games and book your tickets now.
            </Typography>
            <Box sx={{ marginTop: 4 }}>
                <Link to="/events" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" size="large">
                        View Events
                    </Button>
                </Link>
            </Box>
            <Box sx={{ marginTop: 2 }}>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" color="secondary" size="large">
                        Learn More
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default HomePage;
