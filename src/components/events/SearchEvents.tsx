import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Evenement } from '../../types/eventTypes';
import { getEventsByCriteria } from '../../services/eventService';

interface SearchEventsProps {
  onSearchResult: (results: Evenement[]) => void; 
}

const SearchEvents: React.FC<SearchEventsProps> = ({ onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Veuillez entrer un terme de recherche valide.');
      return;
    }
    try {
      const response = await getEventsByCriteria(searchTerm);
      onSearchResult(response.data); 
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la recherche des événements:', error);
    }
  };

  return (
    <Box sx={{ my: 2, mx: 'auto', p: 2, maxWidth: 500, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Search for Events
      </Typography>
      <TextField
        fullWidth
        label="Recherche "
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchEvents;
