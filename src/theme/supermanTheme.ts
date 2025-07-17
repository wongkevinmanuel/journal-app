import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const supermanTheme = createTheme({
    cssVariables: true, 
    palette: {
        primary: {
            main: "#0099f7",
        },
        secondary: {
            main: "#34f9fe",
        },
        background: {
            default: "#fff2cc",
            paper: "#ebfcff",
        },
        error:{
            main: red.A400,
        }
    }
})

export default supermanTheme;