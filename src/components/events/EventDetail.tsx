import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, getOffresByEventId } from "../../services/eventService";
import Offre from "../../types/offre.model";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  CardMedia,
  CardActions,
  Button,
  Alert,
} from "@mui/material";
import { createReservation } from "../../services/reservationService";
import { isAuthenticated } from "../../utils/authUtils";

const EventDetail = () => {
  const { id } = useParams();
  const [eventDetail, setEventDetail]: [any | null, any] = useState(null);
  const [offers, setOffers]: [Offre[], any] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await getEventById(id + "");
        setEventDetail(response.data);
        const response1 = await getOffresByEventId(id + "");
        setOffers(response1.data);
      } catch (error) {
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  const handleAddToCart = async (offerId: number) => {
    if (isAuthenticated()) {
      try {
        await createReservation({
          idOffreId: offerId,
          idEventId: eventDetail.id,
        });
        setSuccess("L'offre a été ajoutée au panier");
      } catch (error) {
        console.error("Failed to add to cart", error);
        setError("L'offre n'a pas pu être ajoutée au panier.");
      }
    } else {
      navigate("/login");
    }
  };

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <Container>
      {/* error and sesccus  */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {eventDetail && (
        <Card sx={{ mb: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={eventDetail.image}
            alt={eventDetail.titre}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {eventDetail.titre}
            </Typography>
            <Typography variant="body2">
              Date: {eventDetail.dateEvent}
            </Typography>
            <Typography variant="body2">
              Location: {eventDetail.lieu}
            </Typography>
            <Typography variant="body2">
              Description: {eventDetail.description}
            </Typography>
            <Typography variant="body2">
              Max Capacity: {eventDetail.nombreDePlacesMax}
            </Typography>
            <Typography variant="body2">
              Available Spots: {eventDetail.nombreDePlacesDisponibles}
            </Typography>
            <Typography variant="body2">
              Available: {eventDetail.isDisponible ? "Yes" : "No"}
            </Typography>
            <Typography variant="body2">
              Unit Price: {eventDetail.prixUnitaire}
            </Typography>
            <Typography variant="body2">
              Category: {eventDetail.categorie}
            </Typography>
          </CardContent>
        </Card>
      )}
      <Typography variant="h6" gutterBottom>
        Offers:
      </Typography>
      <Grid container spacing={2}>
        {offers.length > 0 ? (
          offers.map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{offer.titre}</Typography>
                  <Typography variant="body1">{offer.description}</Typography>
                  <Typography variant="body2">
                    Discount: {offer.remise}%
                  </Typography>
                  <Typography variant="body2">
                    Number of Places: {offer.nbPlace}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleAddToCart(offer.id as number)}
                  >
                    Ajouter au panier
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No offers available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default EventDetail;
