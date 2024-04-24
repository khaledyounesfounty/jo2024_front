// src/components/layout/Navigator.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';

interface NavigatorProps {
  open: boolean;
}

const Navigator: React.FC<NavigatorProps> = ({ open }) => {
  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/events">
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
        {/* Add more navigation items as needed */}
      </List>
    </Drawer>
  );
};

export default Navigator;
