// src/components/RegistrationForm.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { register } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !nom || !prenom || !motDePasse) {
      setError("Veuillez remplir tous les champs.");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError("L'adresse électronique n'est pas valide.");
      return false;
    }
    if (motDePasse.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    setError("");
    const userData = {
      email,
      nom,
      prenom,
      motDePasse,
    };
    try {
      await register(userData);
      navigate("/login");
    } catch (error: any) {
      setError(error.response?.data || "Échec de l'inscription");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        mt: 8, // Added margin top for better vertical spacing
      }}
    >
      <Typography variant="h4" component="h1" color="primary" gutterBottom>
        Créer un compte
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%", // Ensures it uses the maxWidth from the container
          display: "flex",
          flexDirection: "column",
          marginTop: 1,
          padding: 3,
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: 2,
          backgroundColor: "#f5f5f0",
          boxShadow: "0 4px 5px 0 rgba(0, 0, 162, 0.61)",
        }}
      >
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              borderRadius: 2,
              border: "1px solid red",
            }}
          >
            {error}
          </Alert>
        )}
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
          onChange={(e) => setMotDePasse(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          S'inscrire
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Si vous avez déjà un compte,{" "}
          <Link to="/login" style={{ color: "#1976d2" }}>
            Connectez-vous ici
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
