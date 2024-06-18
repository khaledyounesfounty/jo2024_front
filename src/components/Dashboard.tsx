import React, {useEffect, useState} from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getEventStatistics } from "../services/dashboardService";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [eventStatistics, setEventStatistics] = useState<any[]>([]);
  useEffect(() => {
    const fetchEventstatistics = async () => {
        try {
            const response = await getEventStatistics();
            setEventStatistics(response.data);
        } catch (error) {
            console.error("There was an error fetching the eventStatistics", error);
        }
    };

    fetchEventstatistics();
    }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Card
        sx={{
          marginBottom: 2,
          overflow: "hidden",
          background: "rgba(0, 0, 206, 0.36)",
          boxShadow: "0 4px 5px 0 rgba(0, 0, 162, 0.61)",
          borderRadius: "12px",
        }}
      >
        <CardContent>
          <Typography component="div" variant="h6">
            Admin Dashboard
          </Typography>
          <Typography component="div" variant="subtitle1">
            Nombre d'événements disponibles: {eventStatistics.length}
          </Typography>
          <List>
            {eventStatistics.map((event, index) => (
              <Box key={index} sx={{ marginTop: 2 }}>
                <ListItem>
                  <ListItemText
                    primary={event.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Nombre de réservations: {event.totalReservations}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Places restantes: {event.remainingPlaces}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < eventStatistics.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        sx={{ borderRadius: "12px", background: "black", color: "white" }}
        size="small"
        onClick={() => navigate("/events/create")}
      >
        Ajouter un événement
      </Button>
    </Box>
  );
};

export default Dashboard;
