// components/EventList.tsx
import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import EventCard from './EventCard';

const EventList: React.FC = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('There was an error fetching the events', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {events.map((event: any) => (
        <>
        <h2 style={{textAlign: 'center'}}>Liste des événements</h2> 
        <EventCard key={event.id} event={event} />
        </>
      ))}
    </div>
  );
};

export default EventList;
