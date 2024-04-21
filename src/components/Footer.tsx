// Footer.tsx
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3 }}>
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Typography variant="body1">
                    &copy; {new Date().getFullYear()} Jeux Olympiques France
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
