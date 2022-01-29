//----------------------------------------------------------- DEPENDENCIES //
// 1. NextJS
import { useRouter } from "next/router";

// 2. MUI 
import { Container, Grid, Typography, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Box, Tooltip, Divider } from "@mui/material";
import ReadMoreIcon from '@mui/icons-material/ReadMore';

// 3. Context
import { useAuth } from "../../contexts/AuthContext";

// 4. ReactJS
import { useEffect } from "react";

// COMPONENTS
import Loader from "../../components/Loader";
import SearchBar from "../../components/SearchBar";
import AddFavorite from "../../components/AddFavorite";

//----------------------------------------------------------- MAIN FUNCTION //
export default function shows({ searchQuery, showsData }) {

    // Dependency Instances
    const router = useRouter();
    const { currentUser } = useAuth();

    // ========================================== Redirect //
    useEffect(() => {
        if (currentUser === null) {
            router.push("/signin");
        }
    }, [currentUser])

    // ========================================== Helper Method For Rendering //
    function renderShowsList() {
        return showsData.map((show, index) => {
            return (
                <Grid item key={index} xs={12} md={6} lg={4}>
                    <Card sx={{ p: 1 }} elevation={3}>
                        <CardHeader
                            title={<Typography variant="h5">{show.show.name}</Typography>}
                            subheader={
                                (show.show.genres.length)
                                    ? <Typography variant="subheader1" color="primary">{show.show.genres.join(", ")}</Typography>
                                    : <Typography variant="subheader1">Genres not available</Typography>
                            }
                        />
                        {
                            (show.show.image !== null)
                                ? <CardMedia
                                    component="img"
                                    height="194"
                                    image={show.show.image.original}
                                    alt={`${show.show.name}`}
                                />
                                : <CardMedia
                                    component="img"
                                    height="194"
                                    image="https://picsum.photos/512/256"
                                    alt="placeholder"
                                />
                        }
                        <CardContent>
                            {
                                (show.show.summary !== null)
                                    ? <Typography variant="body1">{show.show.summary.replace(/<(.|\n)*?>/g, "").slice(0, 200)}...</Typography>
                                    : <Typography variant="body1">Summary not available</Typography>
                            }
                        </CardContent>
                        <Divider />
                        <CardActions>
                            {
                                (show.show.externals.imdb)
                                    ? <>
                                        <AddFavorite imdb={show.show.externals.imdb} />
                                        <Tooltip title="Read more">
                                            <IconButton
                                                onClick={() => router.push(`/show/${show.show.externals.imdb}`)}
                                                color="primary"
                                            >
                                                <ReadMoreIcon fontSize="large" />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                    : <Typography variant="subtitle2" color="error" >Unfortunately more information is not available for this show.</Typography>
                            }
                        </CardActions>
                    </Card>
                </Grid>
            )
        });
    }

    //----------------------------------------------------------- RENDER //
    return (
        <Container sx={{ mt: 5 }}>
            {
                (currentUser === null)
                    ? <Loader />
                    : <>
                        <Box>
                            <SearchBar />
                            <Typography variant="subtitle1">Showing results for </Typography>
                            <Typography variant="h5">"{searchQuery}"</Typography>

                        </Box>
                        {
                            (!showsData.length)
                                ? <Loader />
                                : <Grid container spacing={2} sx={{ my: 1 }} >
                                    {renderShowsList()}
                                </Grid>
                        }

                    </>
            }
        </Container>
    )
}

//----------------------------------------------------------- SERVER-SIDE-DATA-PRE-FETCHING //
export async function getServerSideProps(context) {

    const { shows } = context.query;
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${shows}`);
    const data = await response.json();

    return {
        props: {
            searchQuery: shows,
            showsData: data
        },
    }
}


// checkout some theme variations
// some improvement in profile page
// correct hearts
// deploy
