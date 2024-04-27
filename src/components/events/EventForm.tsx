import React, { useState } from 'react';
import { Button, TextField, Box, Switch, FormControlLabel, Typography } from '@mui/material';
import { Evenement } from '../../types/eventTypes';
import { createEvent, updateEvent } from '../../services/eventService';
import { useNavigate } from 'react-router-dom';

interface EventFormProps {
  event?: Evenement;
  onSave: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave }) => {
  const [formData, setFormData] = useState<Evenement>(event || {
    id: 0,
    titre: '',
    dateEvent: '',
    lieu: '',
    description: '',
    nombreDePlacesMax: 0,
    nombreDePlacesDisponibles: 0,
    isDisponible: true,
    prixUnitaire: 0,
    image: '',
    categorie: ''
  });
  const [errorevent,setErrorevent] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value
    });
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isDisponible: event.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateEvent(formData.id+'', formData);
      } else {
        await createEvent(formData);
      }
      onSave(); 
      navigate('/events');
    } catch (error:any) {
      setErrorevent('Failed to create or update the event: ' + (error.response?.data?.message || error.message));
      console.error('Failed to create or update the event', (error.response?.data?.message || error.message));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' , padding : '50px'}}>
      <Typography variant="h6">{event ? "Edit Event" : "Create Event"}</Typography>
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
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {event ? "Update Event" : "Create Event"}
      </Button>
    </Box>
  );
};

export default EventForm;
