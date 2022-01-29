//----------------------------------------------------------- DEPENDENCIES //
// 2. MUI
import { Container, CircularProgress } from "@mui/material";

//----------------------------------------------------------- MAIN FUNCTION //
export default function Loader() {

    //----------------------------------------------------------- RENDER //
    return (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress sx={{ position: "absolute", top: "50%" }} />
        </Container>
    )
}