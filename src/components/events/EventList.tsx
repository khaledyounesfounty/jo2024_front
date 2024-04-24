// components/EventList.tsx
import React, { useEffect, useState } from "react";
import { deleteEvent, getEvents } from "../../services/eventService";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
    navigate("/create-event"); // Replace '/create-event' with the path you want to navigate to
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id+'');
      setEvents(events.filter((event: any) => event.id !== id)); // Update state to reflect deletion
    } catch (error) {
      console.error("Failed to delete the event", error);
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Liste des événements</h2>
      {error && <Alert color="error">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}
      <Button
        variant="contained"
        sx={{ borderRadius: "12px", background: "green", color: "white", marginBottom: 2 }}
        size="small"
        onClick={handleEditClick}
      >
        Ajouter un événement
      </Button>
      {events.map((event: any) => (
        <>
          <EventCard key={event.id} event={event} onDelete={() => handleDelete(event.id)} onError={handleError} onSuccess={handleSuccess} /> 
        </>
      ))}
    </div>
  );
};

export default EventList;
