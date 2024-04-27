import React, { useEffect, useState } from "react";
import { deleteEvent, getEvents } from "../../services/eventService";
import { Alert, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/AddCircle";
import EventCard from "./EventCard1";
const EventList: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSuccess = (message: string) => {
    setSuccess(message);
  };

  const handleError = (message: string) => {
    setError(message);
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("There was an error fetching the events", error);
      }
    };

    fetchEvents();
  }, []);
  const handleEditClick = () => {
    navigate("/events/create");
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id + "");
      setEvents(events.filter((event: any) => event.id !== id)); // Update state to reflect deletion
    } catch (error) {
      console.error("Failed to delete the event", error);
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      <h1 style={{ textAlign: "center", color: "gray", fontSize: "30px" }}>
        Événements
      </h1>
      <Box sx={{ display: "flex", justifyContent: "center" , padding: 1 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
        <Button
          sx={{ justifyContent: "end" }}
          variant="contained"
          endIcon={<SaveIcon />}
          onClick={handleEditClick}
        >
          Ajouter un événement
        </Button>
      </Box>
      {events.map((event: any) => (
        <>
          <EventCard
            key={event.id}
            event={event}
            onDelete={() => handleDelete(event.id)}
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </>
      ))}
    </Box>
  );
};

export default EventList;
