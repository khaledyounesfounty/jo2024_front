// src/components/BilletList.tsx
import React, {useState, useEffect} from "react";

import {
    Alert,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import {BilletDto} from "../../types/billetTypes";
import {getAllBillets} from "../../services/billetService";

const BilletList: React.FC = () => {
    const [billets, setBillets]: [BilletDto[], any] = useState<BilletDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBillets = async () => {
            try {
                const response = await getAllBillets();
                setBillets(response);
            } catch (error) {
                setError("Une erreur s'est produite lors du chargement des billets.");
            } finally {
                setLoading(false);
            }
        };

        fetchBillets();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Alert severity="error">{error}</Alert>;

    const getPublicImagePath = (path: string) => {
        const filename = path.split("/").pop(); // Extract filename from path
        return `/assets/images/qrCodes/${filename}`; // Construct the public path
    };
    return (
        <Paper style={{margin: 20, padding: 20}}>
            <Typography variant="h6">Mes Billets</Typography>
            <List>
                {billets.map((billet) => (
                    <ListItem key={billet.reservation.id}>
                        <ListItemText
                            primary={`${billet.idUtilisateur.utilisateurprincipal.nom} ${billet.idUtilisateur.utilisateurprincipal.prenom}`}
                            secondary={<>
                                Event: {billet.reservation.idEvent.titre} - Price: ${billet.reservation.prix} - Date
                                Event: {billet.reservation.idEvent.dateEvent}
                                <br/>
                                Offre: {billet.reservation.idOffre.titre}
                            </>}
                        />
                        <div
                            style={{maxWidth: 200, maxHeight: 200}}
                            dangerouslySetInnerHTML={{__html: billet.qrcode.qrImage}}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default BilletList;
