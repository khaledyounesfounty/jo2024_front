import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/authUtils';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate('/login'); 
        window.location.reload();
    }, [navigate]);

    // Optionally, display a loading message or spinner here
    return <div>Logging out...</div>;
};

export default Logout;