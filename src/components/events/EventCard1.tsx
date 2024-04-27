import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Evenement } from '../../types/eventTypes';
import { deleteEvent } from '../../services/eventService';

interface EventCardProps {
  event: Evenement;
  onDelete: (id: number) => void; 
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete , onError, onSuccess }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/events/edit/${event.id}`);
  };

  const handleDelete = async () => {
    // add confirmation dialog here
    const confirmDelete = window.confirm('Vous êtes sûr de vouloir supprimer cet événement?');
    if (!confirmDelete) {
      return;
    }
    try {
      await deleteEvent(event.id+'');
      if (onSuccess) {  // Check if onSuccess callback is provided
        onSuccess('L\'événement a été supprimé avec succès');
      }
      onDelete(event.id as number);
    } catch (error:any) {
      if (onError) {  // Check if onError callback is provided
        onError('Erreur lors de la suppression de l\'événement : ' + (error.response?.data?.message || error.message));
      }
    }
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
        <Button size="small" onClick={() => navigate(`/events/${event.id}`)}>Réserver</Button>
        <Button size="small" onClick={() => navigate(`/events/${event.id}`)}>Détails</Button>
        <Button size="small" onClick={handleEdit}>Modifier</Button>
        <Button size="small" onClick={handleDelete}>Supprimer</Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
