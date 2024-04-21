import React from 'react';
import { isAuthenticated, hasRole, logout } from '../utils/authUtils';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    if (!isAuthenticated()) {
        navigate('/login');
    }

    const UserDashboard = () => (
        <>
            <Typography variant="h4" sx={{ my: 2 }}>Mon Tableau de Bord</Typography>
            {/* Here you will display the user's reservations and other related content */}
            <Button variant="contained" onClick={() => navigate('/reservations')}>
                Voir Mes Réservations
            </Button>
            {/* More user dashboard content */}
        </>
    );

    // Admin Dashboard Content
    const AdminDashboard = () => (
        <>
            <Typography variant="h4" sx={{ my: 2 }}>Tableau de Bord de l'Administrateur</Typography>
            {/* Here you will display the admin's statistics and manage offers/events */}
            <Button variant="contained" onClick={() => navigate('/manage-offers')}>
                Gérer les Offres
            </Button>
            <Button variant="contained" onClick={() => navigate('/manage-events')} sx={{ mt: 2 }}>
                Gérer les Événements
            </Button>
            {/* More admin dashboard content */}
        </>
    );

    const dashboardContent = hasRole('ADMIN') ? <AdminDashboard /> : <UserDashboard />;

    // Logout function
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
           
            <Container component="main" sx={{ flex: 1 }}>
                {dashboardContent}
                <Button variant="outlined" onClick={handleLogout} sx={{ mt: 2 }}>
                    Déconnexion
                </Button>
            </Container>
    
        </Box>
    );
};

export default Dashboard;
