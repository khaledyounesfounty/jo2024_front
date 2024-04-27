import React from 'react';
import EventList from '../components/events/EventList';
import EventForm from '../components/events/EventForm';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateNewEvent = () => {
    navigate('/events/create');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button onClick={handleCreateNewEvent} variant="contained" color="primary">
        Create New Event
      </Button>
    </div>
  );
};

export default AdminDashboard;
