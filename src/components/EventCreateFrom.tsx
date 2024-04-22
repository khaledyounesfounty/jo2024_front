// components/EventCreateOrUpdateForm.tsx
import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { createEvent, updateEvent } from "../services/eventService";

interface EventFormData {
  id?: string;
  titre: string;
  dateEvent: string;
  lieu: string;
  description: string;
  nombreDePlacesMax: number;
  nombreDePlacesDisponibles: number;
  isDisponible: boolean;
  prixUnitaire: number;
  image: string;
  categorie: string;
}

interface EventFormProps {
  event?: EventFormData; // If this prop is provided, the form is in "edit" mode.
}

const EventCreateForm: React.FC<EventFormProps> = ({ event }) => {
  const [eventData, setEventData] = useState<EventFormData>({
    titre: "",
    dateEvent: "",
    lieu: "",
    description: "",
    nombreDePlacesMax: 0,
    nombreDePlacesDisponibles: 0,
    isDisponible: true,
    prixUnitaire: 0,
    image: "",
    categorie: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (event) {
      setEventData(event);
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? Number(value) : value;
    setEventData({ ...eventData, [name]: finalValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (event) {
        await updateEvent(event.id!, eventData); // Assuming updateEvent needs an ID
      } else {
        await createEvent(eventData);
      }
      setEventData({
        titre: "",
        dateEvent: "",
        lieu: "",
        description: "",
        nombreDePlacesMax: 0,
        nombreDePlacesDisponibles: 0,
        isDisponible: true,
        prixUnitaire: 0,
        image: "",
        categorie: "",
      });
      
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour de l'événement");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1 }}
      className="p-4 bg-white rounded-lg shadow-md w-full mx-auto"
    >
      <TextField
        required
        fullWidth
        id="titre"
        label="Titre de l'événement"
        name="titre"
        value={eventData.titre}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        required
        fullWidth
        id="dateEvent"
        label="Date de l'événement"
        name="dateEvent"
        type="date"
        value={eventData.dateEvent}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        fullWidth
        id="lieu"
        label="Lieu"
        name="lieu"
        value={eventData.lieu}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        id="description"
        label="Description"
        name="description"
        value={eventData.description}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        id="nombreDePlacesMax"
        label="Nombre de places max"
        name="nombreDePlacesMax"
        type="number"
        value={eventData.nombreDePlacesMax}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        id="nombreDePlacesDisponibles"
        label="Nombre de places disponibles"
        name="nombreDePlacesDisponibles"
        type="number"
        value={eventData.nombreDePlacesDisponibles}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        id="prixUnitaire"
        label="Prix unitaire"
        name="prixUnitaire"
        type="number"
        value={eventData.prixUnitaire}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        id="image"
        label="Image"
        name="image"
        value={eventData.image}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        id="categorie"
        label="Catégorie"
        name="categorie"
        value={eventData.categorie}
        onChange={handleChange}
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        {event ? "Modifier l'événement" : "Créer l'événement"}
      </Button>
      {error && <Box sx={{ color: "error.main" }}>{error}</Box>}
    </Box>
  );
};

export default EventCreateForm;
