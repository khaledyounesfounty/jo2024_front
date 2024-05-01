import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Switch,
  FormControlLabel,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
} from "@mui/material";
import { Evenement } from "../../types/eventTypes";
import { createEvent, updateEvent } from "../../services/eventService";
import { useNavigate } from "react-router-dom";
import { getOffres } from "../../services/offreService";
import Offre from "../../types/offre.model";

interface EventFormProps {
  event?: Evenement;
  onSave: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave }) => {
  const [formData, setFormData] = useState({
    ...event,
    nombreDePlacesMax: event?.nombreDePlacesMax || 0,
    nombreDePlacesDisponibles: event?.nombreDePlacesDisponibles || 0,
    isDisponible: event?.isDisponible || true,
    prixUnitaire: event?.prixUnitaire || 0,
    image: event?.image || "",
    categorie: event?.categorie || "",
    offreIds: event?.offreIds || [],
  });
  const [errorevent, setErrorevent] = useState<string | null>(null);
  const navigate = useNavigate();
  const [allOffres, setAllOffres]: [Offre[], any] = useState([]);
  const [selectedOffres, setSelectedOffres] = useState(event?.offres || []);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await getOffres();
        setAllOffres(response.data);
      } catch (error) {
        setErrorevent(
          "Une erreur s'est produite lors de la récupération des offres "
        );
      }
    };
    fetchOffres();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  };

  const handleSelectOffres = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedOffres(typeof value === "string" ? value.split(",") : value);
    setFormData({ ...formData, offres: value });
    console.log("Selected Offres", selectedOffres);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Data to save", formData);
      if (formData.id) {
        await updateEvent(formData.id + "", formData);
      } else {
        await createEvent(formData);
      }
      onSave();
      navigate("/events");
    } catch (error: any) {
      setErrorevent(
        "Failed to create or update the event: " +
          (error.response?.data?.message || error.message)
      );
      console.error(
        "Failed to create or update the event",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", padding: "50px" }}
    >
      <Typography variant="h6">
        {event ? "Edit Event" : "Create Event"}
      </Typography>
      {errorevent && <Typography color="error">{errorevent}</Typography>}
      <TextField
        label="Title"
        name="titre"
        value={formData.titre}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Event Date"
        name="dateEvent"
        type="date"
        value={formData.dateEvent}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Location"
        name="lieu"
        value={formData.lieu}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Max Capacity"
        name="nombreDePlacesMax"
        type="number"
        value={formData.nombreDePlacesMax}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Available Spots"
        name="nombreDePlacesDisponibles"
        type="number"
        value={formData.nombreDePlacesDisponibles}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData.isDisponible}
            onChange={handleSwitchChange}
            name="isDisponible"
          />
        }
        label="Available"
      />
      <TextField
        label="Unit Price"
        name="prixUnitaire"
        type="number"
        value={formData.prixUnitaire}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Todo : Cette input doit etre un SlectFile type image (jpg, png, jpeg) , taille max 2Mo */}
      <TextField
        label="Image URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Todo : on veut que cette champs devient une select list qui charge d'un Json(src/data/eventCategories.json) */}
      <TextField
        label="Category"
        name="categorie"
        value={formData.categorie}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-multiple-chip-label">Offres</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          multiple
          value={selectedOffres}
          onChange={handleSelectOffres}
          input={<OutlinedInput id="select-multiple-chip" label="Offres" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((selectedId) => {
                const offer = allOffres.find(
                  (offer) => offer.id === Number(selectedId)
                );
                if (!offer) return null; // This ensures no undefined or null values are processed further.
                return (
                  <Chip
                    key={offer.id} // Ensuring `key` is always a unique and defined value
                    label={offer.titre} // Using the `titre` from the found offer
                  />
                );
              })}
            </Box>
          )}
        >
          {allOffres.map((offre) => (
            <MenuItem key={offre.id} value={offre.id}>
              {offre.titre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {event ? "Update Event" : "Create Event"}
      </Button>
    </Box>
  );
};

export default EventForm;
