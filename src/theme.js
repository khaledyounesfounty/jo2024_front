
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blue shade
        },
        secondary: {
            main: '#dc004e', // Optionally, some other color
        },
        background: {
            default: '#f4f4f4', // Light grey background
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
    components: {
        // You can customize MUI components globally here
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Buttons with normal casing
                },
            },
        },
    },
});

export default theme;
