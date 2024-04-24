// src/pages/UserDashboard.tsx
import React from 'react';
import EventList from '../components/events/EventList';

const UserDashboard: React.FC = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <EventList />
    </div>
  );
};

export default UserDashboard;
