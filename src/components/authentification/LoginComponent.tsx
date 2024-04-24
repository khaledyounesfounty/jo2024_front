import React, { useState } from "react";
import { login } from "../../services/authService";
import {
  TextField,
  Button,
  Alert,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const LoginComponent: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError(
        "Veuillez entrer à la fois le nom d'utilisateur et le mot de passe."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    setError("");
    try {
      await login({ username, password });
      navigate("/dashboard"); // Make sure the '/dashboard' route is properly defined in your routing setup
    } catch (error: any) {
      setError(error.response?.data || "Échec de la connexion");
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
        Connexion
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
          label="Nom d'utilisateur"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ ".MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <TextField
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ ".MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Connexion
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Pas encore de compte?{" "}
          <Link to="/register" style={{ color: "#1976d2" }}>
            Inscrivez-vous ici
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginComponent;
