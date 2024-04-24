// components/EventCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Evenement } from "../types/eventTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../services/eventService";
interface EventCardProps {
  event: Evenement;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(event.id + "");
        // Optionally, navigate to another route after deletion
        navigate("/eventlist");
      } catch (error) {
        console.error("Error deleting the event", error);
        // Handle error (e.g., display an error message to the user)
      }
    }
  };
  return (
    <Card
      sx={{
        display: "flex",
        marginBottom: 2,
        overflow: "hidden",
        background: "rgba(0, 0, 206, 0.36)",
        boxShadow: "0 4px 5px 0 rgba(0, 0, 162, 0.61)",
        borderRadius: "12px",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151, height: 151, objectFit: "cover" }}
        image={event.image || "/placeholder.jpg"} // Replace with your placeholder image path
        alt={`Image de ${event.titre}`}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent>
          <Typography component="div" variant="h6">
            {event.titre}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Date: {new Date(event.dateEvent).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Lieu: {event.lieu}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Catégorie: {event.categorie}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Places disponibles: {event.nombreDePlacesDisponibles} /{" "}
            {event.nombreDePlacesMax}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Prix: {event.prixUnitaire.toFixed(2)} €
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{ flexGrow: 1 }}
        className="flex-row 
        justify-content-end align-items-center"
      >
        <Button
          variant="contained"
          sx={{ borderRadius: "12px", background: "black", color: "white" }}
          size="small"
        >
          Reserver
        </Button>

        <Button
          variant="contained"
          sx={{ borderRadius: "12px", background: "green", color: "white" }}
          size="small"
          onClick={() => navigate(`/event/${event.id}`)}
        >
          <CreateIcon />
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </Box>
    </Card>
  );
};

export default EventCard;
