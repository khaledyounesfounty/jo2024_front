import React, { useState } from 'react';
import { login } from '../services/authService';
import { TextField, Button, Alert, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const validateForm = () => {
        if (!username || !password) {
            setError('Veuillez entrer à la fois le nom d\'utilisateur et le mot de passe.');
            return false;
        }
        return true;
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) return;
        setError('');
        try {
            await login({ username, password });
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.response?.data || 'Échec de la connexion');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2
        }}>
            <h1 style={{ color: '#1976d2' }}>Login</h1>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%', // This ensures it uses the maxWidth from the container
                marginTop: 1,
                padding: '20px',
                border: '1px solid #1976d2',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                background: '#fff'
            }}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                        '.MuiOutlinedInput-root': {
                            borderRadius: '15px'
                        }
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        '.MuiOutlinedInput-root': {
                            borderRadius: '15px'
                        }
                    }}
                />
                <Button type="submit" variant="contained" fullWidth sx={{
                    marginTop: 2,
                    borderRadius: '15px',
                    backgroundColor: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#125a92'
                    }
                }}>
                    Login
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Creer un compte? <Link to="/register" style={{ color: '#1976d2' }}>Register here</Link>
                </Typography>
            </form>
        </Container>
    );
};

export default LoginForm;
