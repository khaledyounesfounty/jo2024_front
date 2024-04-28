// src/components/PaymentForm.tsx
import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { validerPanier } from "../services/panierService";
import { useNavigate } from "react-router-dom";

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

const PaymentForm: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Payment Details:", paymentDetails);
    const response: any = await validerPanier();
    navigate("/billets");
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Les détails de paiement
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  variant="outlined"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Expiry Date"
                  name="expiryDate"
                  variant="outlined"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="CVV"
                  name="cvv"
                  variant="outlined"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Holder Name"
                  name="cardHolderName"
                  variant="outlined"
                  value={paymentDetails.cardHolderName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Payer
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentForm;
