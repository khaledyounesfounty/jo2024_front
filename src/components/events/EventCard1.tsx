// src/components/events/EventCard.tsx
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Evenement } from '../../types/eventTypes';
import { deleteEvent } from '../../services/eventService';

interface EventCardProps {
  event: Evenement;
  onDelete: (id: number) => void;  // Callback to trigger after delete
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/events/edit/${event.id}`);
  };

  const handleDelete = async () => {
    await deleteEvent(event.id+'');
    onDelete(event.id as number);
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      {event.image && (
        <CardMedia
          component="img"
          height="140"
          image={event.image}
          alt={event.titre}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.titre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {event.dateEvent}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lieu: {event.lieu}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Places disponibles: {event.nombreDePlacesDisponibles} / {event.nombreDePlacesMax}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Prix: {event.prixUnitaire.toFixed(2)} €
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/events/${event.id}`)}>Détails</Button>
        <Button size="small" onClick={() => navigate(`/events/${event.id}`)}>Détails</Button>
        <Button size="small" onClick={handleEdit}>Modifier</Button>
        <Button size="small" onClick={handleDelete}>Supprimer</Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
