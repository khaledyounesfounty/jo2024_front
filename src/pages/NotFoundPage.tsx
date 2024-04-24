// src/pages/NotFoundPage.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Désolé, cette page n'existe pas.
      </Typography>
      <Typography variant="subtitle1">
        L'URL demandée n'a pas été trouvée sur ce serveur. Si vous avez entré l'URL manuellement, veuillez vérifier votre orthographe et réessayer.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Retour à la page d'accueil
        </Link>
      </Button>
    </Box>
  );
};

export default NotFoundPage;
