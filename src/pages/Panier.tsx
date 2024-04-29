import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { PanierDto, ReservationDto } from "../types/panier";
import { getPanierDetails } from "../services/panierService";
import { useNavigate } from "react-router-dom";

const Panier: React.FC = () => {
  const [cart, setCart] = useState<PanierDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const response = await getPanierDetails();
        setCart(response.data);
      } catch (error) {
        console.error("Failed to load cart details:", error);
      }
    };

    fetchPanier();
  }, []);

  const handleValidateCart = () => {
    console.log("Validating cart...");
    const confirm = window.confirm(
      "Voulez-vous vraiment valider votre panier?"
    );
    if (confirm) {
      navigate("/payment");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, textAlign: "center" }}>
        Vos réservations
      </Typography>
      {cart && cart.reservations.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {cart.reservations.map((reservation) => (
              <Grid item xs={12} md={6} key={reservation.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {reservation.idOffre.titre}
                    </Typography>
                    <Typography color="textSecondary">
                      {reservation.idOffre.description}
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Event"
                          secondary={reservation.idEvent.titre}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Date"
                          secondary={reservation.idEvent.dateEvent}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Location"
                          secondary={reservation.idEvent.lieu}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Price"
                          secondary={`$${reservation.prix}`}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleValidateCart}
            sx={{ mt: 2 }}
          >
            Valider le panier
          </Button>
        </>
      ) : (
        <Typography variant="h6" gutterBottom>
          Votre panier est vide
        </Typography>
      )}
    </Container>
  );
};

export default Panier;
