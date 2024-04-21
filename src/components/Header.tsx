import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('jwtToken');

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ background: '#1976d2' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                        Accueil
                    </Typography>
                </Box>
                {!token && (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Connexion
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Inscription
                        </Button>
                    </>
                )}
                {token && user.role === 'USER' && (
                    <>
                        <Button color="inherit" component={Link} to="/panier">
                            Mon Panier
                        </Button>
                        <Button color="inherit" component={Link} to="/reservations">
                            Mes Réservations
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Déconnexion
                        </Button>
                    </>
                )}
                {token && user.role === 'ADMIN' && (
                    <>
                        <Button color="inherit" component={Link} to="/manage-offers">
                            Gérer les Offres
                        </Button>
                        <Button color="inherit" component={Link} to="/manage-events">
                            Gérer les Événements
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Déconnexion
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
