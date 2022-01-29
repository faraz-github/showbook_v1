//----------------------------------------------------------- DEPENDENCIES //
// 1. NextJS
import { useRouter } from "next/router";
import Image from "next/image";

// 2. MUI 
import { Container, Grid, Typography, Divider, Paper, Button } from "@mui/material";

// 3. Context
import { useAuth } from "../../contexts/AuthContext";

// 4. ReactJS
import { useEffect } from "react";

// COMPONENTS
import Loader from "../../components/Loader";
import AddFavorite from "../../components/AddFavorite";

//----------------------------------------------------------- MAIN FUNCTION //
export default function imdbID({ showData }) {

    // Dependency Instances
    const router = useRouter();
    const { currentUser } = useAuth();

    // ========================================== Redirect //
    useEffect(() => {
        if (currentUser === null) {
            router.push("/signin");
        }
    }, [currentUser])

    //----------------------------------------------------------- RENDER //
    return (
        <Container sx={{ mt: 5 }}>
            {
                (currentUser === null)
                    ? <Loader />
                    : <>
                        {
                            (!showData)
                                ? <Loader />
                                : <Paper elevation={3} sx={{ p: 2 }}>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
                                            {
                                                (showData.name !== null)
                                                    ? <Typography variant="h4" gutterBottom>{showData.name}</Typography>
                                                    : <Typography variant="h4" gutterBottom>N/A</Typography>
                                            }
                                            {
                                                (showData.image !== null)
                                                    ? <Image src={showData.image.original} width={256} height={384} />
                                                    : <Image src="https://picsum.photos/256/384" width={256} height={384} />
                                            }
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {
                                                (showData.language)
                                                    ? <Typography variant="body1" gutterBottom><b>Language:</b> {showData.language}</Typography>
                                                    : <Typography variant="body1" gutterBottom><b>Language:</b> N/A</Typography>
                                            }
                                            {
                                                (showData.premiered)
                                                    ? (showData.ended)
                                                        ? <Typography variant="body1" gutterBottom><b>Timeline:</b> {showData.premiered.slice(0, 4)} to {showData.ended.slice(0, 4)}</Typography>
                                                        : <Typography variant="body1" gutterBottom><b>Timeline:</b> {showData.premiered.slice(0, 4)} to Now</Typography>
                                                    : <Typography variant="body1" gutterBottom><b>Timeline:</b> Not Available</Typography>
                                            }
                                            {
                                                (showData.summary)
                                                    ? <Typography variant="body1" gutterBottom><b>About the show:</b> {showData.summary.replace(/<(.|\n)*?>/g, "")}</Typography>
                                                    : <Typography variant="body1" gutterBottom><b>About the show:</b> Not Available</Typography>
                                            }
                                            {
                                                (showData.rating.average)
                                                    ? <Typography variant="body1" gutterBottom><b>Rating:</b> {showData.rating.average} / 10</Typography>
                                                    : <Typography variant="body1" gutterBottom><b>Rating:</b> Not Available</Typography>
                                            }
                                            {
                                                (showData.officialSite)
                                                    ? <Button variant="outlined" onClick={() => router.push(`${showData.officialSite}`)}>Official Website</Button>
                                                    : null
                                            }
                                            <Divider sx={{ my: 1 }} />

                                            <AddFavorite imdb={showData.externals.imdb} />

                                        </Grid>
                                    </Grid>
                                </Paper>
                        }

                    </>
            }
        </Container>

    )
}

//----------------------------------------------------------- SERVER-SIDE-DATA-PRE-FETCHING //
export async function getServerSideProps(context) {

    const { imdbID } = context.query;
    const response = await fetch(`https://api.tvmaze.com/lookup/shows?imdb=${imdbID}`);
    const data = await response.json();

    return {
        props: {
            showData: data
        },
    }
}
