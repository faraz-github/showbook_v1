//----------------------------------------------------------- DEPENDENCIES //
// 0. Firebase
import { firebaseApp } from "../firebase";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";

// 1. NextJS
import { useRouter } from "next/router";

// 2. MUI 
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useTheme } from "@mui/styles";

// 3. Context
import { useAuth } from "../contexts/AuthContext";

// 4. ReactJS
import { useEffect, useState } from "react"

// COMPONENTS
import Loader from "../components/Loader";
import RemoveFavorite from "../components/RemoveFavorite";

//----------------------------------------------------------- MAIN FUNCTION //
export default function profile() {

    // Dependency Instances
    const db = getFirestore(firebaseApp);
    const router = useRouter();
    const theme = useTheme();
    const { currentUser } = useAuth();

    // State Variables
    const [favoriteList, setFavoriteList] = useState([]);

    // ========================================== Redirect And Getting User's Favorites //
    useEffect(() => {

        if (currentUser === null) {
            router.push("/signin");
        }
        if (currentUser) {
            getFavorites(currentUser);
        }

        function getFavorites(user) {
            onSnapshot(collection(db, "users", user.uid, "favorites"), (querySnapshot) => {
                setFavoriteList([]);
                querySnapshot.forEach((doc) => {
                    setFavoriteList((prevArray) => [...prevArray, doc.data()])
                })
            })
        }

    }, [db, currentUser])

    // ========================================== Helper Method For Rendering //
    function renderShowsList() {
        return favoriteList.map((show, index) => {
            return (
                <Grid item key={index} xs={12} md={6} lg={4}>
                    <Card sx={{ p: 1 }} elevation={3}>
                        <CardHeader
                            title={<Typography variant="h5">{show.name}</Typography>}
                            subheader={
                                (show.genres.length)
                                    ? <Typography variant="subheader1" color="primary">{show.genres.join(", ")}</Typography>
                                    : <Typography variant="subheader1">Genres not available</Typography>
                            }
                        />
                        {
                            (show.image !== null)
                                ? <CardMedia
                                    component="img"
                                    height="194"
                                    image={show.image.original}
                                    alt={`${show.name}`}
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
                                (show.summary !== null)
                                    ? <Typography variant="body1">{show.summary.replace(/<(.|\n)*?>/g, "").slice(0, 200)}...</Typography>
                                    : <Typography variant="body1">Summary not available</Typography>
                            }
                        </CardContent>
                        <Divider />
                        <CardActions>
                            {
                                (show.externals.imdb)
                                    ? <>
                                        <RemoveFavorite imdb={show.externals.imdb} />
                                        <Tooltip title="Read more">
                                            <IconButton
                                                onClick={() => router.push(`/show/${show.externals.imdb}`)}
                                                color="primary"
                                            >
                                                <ReadMoreIcon fontSize="large" />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                    : null
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
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{currentUser.displayName ? currentUser.displayName[0].toUpperCase() : "P"}</Avatar>
                                }
                                action={
                                    <Tooltip title="Account Settings">
                                        <IconButton onClick={() => { router.push("/settings") }}>
                                            <ManageAccountsIcon color="primary" fontSize="large"/>
                                        </IconButton>
                                    </Tooltip>
                                }
                                title={<Typography variant="h3">Profile</Typography>}
                                subheader="User account information"
                            />
                            <CardContent>
                                <Typography variant="h5"><b>Name:</b> {currentUser.displayName ? currentUser.displayName : "Not Available"}</Typography>
                                <Typography variant="h5"><b>Email:</b> {currentUser.email}</Typography>
                            </CardContent>
                        </Card>
                        <Grid container spacing={2} sx={{ my: 2 }}>
                            {renderShowsList()}
                        </Grid>
                    </>
            }

        </Container>
    )
}