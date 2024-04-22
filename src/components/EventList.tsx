// components/EventList.tsx
import React, { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import EventCard from "./EventCard";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const EventList: React.FC = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
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
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Liste des événements</h2>
      <Button
        variant="contained"
        sx={{ borderRadius: "12px", background: "green", color: "white" }}
        size="small"
        onClick={handleEditClick}
      >
        Ajouter un événement
      </Button>
      {events.map((event: any) => (
        <>
          <EventCard key={event.id} event={event} />
        </>
      ))}
    </div>
  );
};

export default EventList;
