import React, {useState} from 'react';
import {TextField, Button, Alert, Container, Typography} from '@mui/material';
import {register} from '../services/authService';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const RegistrationForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [motDePasse, setmotDePasse] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const validateForm = () => {
        if (!email || !nom || !prenom || !motDePasse) {
            setError('Veuillez remplir tous les champs.');
            return false;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setError('L\'adresse électronique n\'est pas valide.');
            return false;
        }
        if (motDePasse.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.');
            return false;
        }
        return true;
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) return;
        setError('');
        const userData = {
            email,
            nom,
            prenom,
            motDePasse,
        };
        try {
            await register(userData);
            navigate('/login');
        } catch (error: any) {
            setError(error.response?.data || 'Échec de l\'inscription');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
        }}>
            <h1 style={{color: '#1976d2'}}>Creer un compte</h1>
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
                    label="Adresse électronique"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Nom"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <TextField
                    label="Prénom"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />
                <TextField
                    label="Mot de passe"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={motDePasse}
                    onChange={(e) => setmotDePasse(e.target.value)}
                />
                <Button type="submit" variant="contained" fullWidth>
                    S'inscrire
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }}>
                   Si vous avez déjà un compte, <Link to="/login" style={{color: '#1976d2'}}>Connectez-vous ici</Link>
                </Typography>
            </form>
        </Container>
    );
};

export default RegistrationForm;
