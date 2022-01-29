import { createTheme } from "@mui/material";
import { pink } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            light: '#3f5685',
            main: '#0F2C67',
            dark: '#0a1e48',
        },
        secondary: {
            light: '#f5aa3d',
            main: '#F3950D',
            dark: '#aa6809',
        },
    },
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
    }
})

export default theme;