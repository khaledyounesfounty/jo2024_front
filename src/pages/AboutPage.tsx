// src/pages/AboutPage.tsx
import React from 'react';
import { Box, Typography, Paper, Link as MuiLink } from '@mui/material';

const AboutPage: React.FC = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    About the 2024 Olympic Games
                </Typography>
                <Typography variant="body1" paragraph>
                    The Olympic Games are a global celebration of sport and community. Held every four years, they unite athletes from around the world in a series of competitions across a variety of sports.
                </Typography>
                <Typography variant="body1" paragraph>
                    In 2024, France will host the Olympic Games, bringing together thousands of athletes and spectators in a festival of sporting excellence and international friendship.
                </Typography>
                <Typography variant="body1" paragraph>
                    The 2024 Olympic Games in France aim to set a new standard for sustainability and technological integration, ensuring that the legacy of the Games benefits future generations.
                </Typography>
                <Typography variant="h6">
                    Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                    Our mission is to organize and deliver an unforgettable Olympic Games that not only showcases the pinnacle of athletic achievement but also promotes peace, innovation, and sustainability.
                </Typography>
                <Typography variant="h6">
                    Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    For more information about the Olympic Games, please visit our official website or contact our support team.
                </Typography>
                <MuiLink href="https://www.olympic.org/" target="_blank" rel="noopener">
                    Official Olympic Website
                </MuiLink>
            </Paper>
        </Box>
    );
};

export default AboutPage;
