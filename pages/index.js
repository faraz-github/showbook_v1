//----------------------------------------------------------- DEPENDENCIES //
// 1. NextJS
import Image from "next/image";
import { useRouter } from "next/router";

// 2. MUI 
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// 3. Context
import { useAuth } from "../contexts/AuthContext";
//----------------------------------------------------------- MAIN FUNCTION //
export default function Home() {

  // Dependency Instances
  const router = useRouter();
  const { currentUser } = useAuth();

  // ========================================== Get Started //
  function getStarted() {
    if (currentUser === null) {
      router.push("/signup")
    }
    if (currentUser !== null) {
      router.push("/search")
    }
  }
  //----------------------------------------------------------- RENDER //
  return (
    <Container>

      <Grid container>

        <Grid item xs={12} md={7} >
          <Typography variant="h2" sx={{ marginTop: 10 }}>The entertainment shows library you always wanted.</Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<PlayArrowIcon />}
            onClick={getStarted}
            sx={{ marginTop: 5 }}
            color="secondary"
          >
            Get Started
          </Button>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box sx={{ marginTop: 10, marginBottom: 5 }}>
            <Image src="/tv.png" width="512px" height="512px" />
          </Box>
        </Grid>

      </Grid>

    </Container>
  )
}
