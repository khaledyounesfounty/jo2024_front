import React, { useState, useEffect } from "react";
import Create from "@mui/icons-material/Create";
import {
  Container,
  Button,
  TextField,
  Typography,
  Grid,
  CardContent,
  Card,
  CardActions,
  Box,
  Alert,
} from "@mui/material";
import Offre from "../../types/offre.model";
import {
  createOffre,
  deleteOffre,
  getOffres,
  updateOffre,
} from "../../services/offreService";
interface OffreFormProps {
  offre?: Offre;
  onSave: (offre: Offre) => void;
  onCreateNew: () => void;
}
const OffresCrud: React.FC = () => {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [editingOffre, setEditingOffre] = useState<Offre | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setError(""); // Optionally reset the error state if you wish
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setSuccess(""); // Optionally reset the success state if you wish
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    const response = await getOffres();
    if (response.status !== 200) {
      setError("Le chargement des offres a échoué.");
    } else {
      setSuccess("Les offres ont été chargées avec succès.");
      setOffres(response.data);
    }
  };

  const handleSave = async (offre: Offre) => {
    if (
      offre.titre === "" ||
      offre.description === "" ||
      offre.remise === 0 ||
      offre.nbPlace === 0
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (offre.remise < 0 || offre.remise > 100) {
      setError("La remise doit être comprise entre 0 et 100.");
      return;
    }
    if (offre.id) {
      const responce = await updateOffre(offre.id, offre);
      if (responce.status !== 200) {
        setError("La mise à jour de l'offre a échoué.");
      } else {
        setSuccess("L'offre a été mise à jour avec succès.");
      }
    } else {
      const responce = await createOffre(offre);
      if (responce.status !== 200) {
        setError("La création de l'offre a échoué.");
      } else {
        setSuccess("L'offre a été créée avec succès.");
      }
    }
    fetchOffres();
  };

  const handleDelete = async (id: number) => {
    const responce = await deleteOffre(id);
    if (responce.status !== 200) {
      setError("La suppression de l'offre a échoué.");
    } else {
      setSuccess("L'offre a été supprimée avec succès.");
    }
    fetchOffres();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, textAlign: "center" }}>
        Gerer les offres
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEditingOffre({} as Offre)}
        startIcon={<Create />}
        sx={{ m: 2, textAlign: "center" }}
      >
        Ajouter une offre
      </Button>
      <Box sx={{ textAlign: "center" }}>
        {error && (
          <Alert severity="error" sx={{ m: 1 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ m: 1 }}>
            {success}
          </Alert>
        )}
      </Box>
      {editingOffre && (
        <OffreForm
          offre={editingOffre}
          onSave={(offre) => {
            handleSave(offre);
            setEditingOffre(null);
          }}
          onCreateNew={() => setEditingOffre(null)}
        />
      )}
      <Grid container spacing={2}>
        {offres.map((offre) => (
          <Grid item xs={12} sm={6} md={4} key={offre.id}>
            <Card raised sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {offre.titre}
                </Typography>
                <Typography variant="body2">{offre.description}</Typography>
                <Typography variant="body2">
                  Discount: {offre.remise}%
                </Typography>
                <Typography variant="body2">
                  Number of Places: {offre.nbPlace}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={() => setEditingOffre(offre)}>
                  Edit
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleDelete(offre.id ?? 0)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const OffreForm: React.FC<OffreFormProps> = ({
  offre,
  onSave,
  onCreateNew,
}) => {
  const [localOffre, setLocalOffre] = useState<Offre>(
    offre || {
      id: 0,
      titre: "",
      description: "",
      remise: 0,
      nbPlace: 0,
    }
  );

  useEffect(() => {
    setLocalOffre(
      offre || {
        id: 0,
        titre: "",
        description: "",
        remise: 0,
        nbPlace: 0,
      }
    );
  }, [offre]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalOffre({
      ...localOffre,
      [e.target.name]:
        e.target.type === "number"
          ? parseInt(e.target.value, 10)
          : e.target.value,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(localOffre);
      }}
      sx={{
        m: 2,
        p: 2,
        boxShadow: 3,
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <TextField
        label="Title"
        name="titre"
        value={localOffre.titre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Description"
        name="description"
        value={localOffre.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
      />
      <TextField
        label="Discount"
        name="remise"
        type="number"
        value={localOffre.remise}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Number of Places"
        name="nbPlace"
        type="number"
        value={localOffre.nbPlace}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default OffresCrud;
