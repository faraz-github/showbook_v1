//----------------------------------------------------------- DEPENDENCIES //
// 0. Firebase
import { firebaseApp } from "../firebase";
import { getFirestore, doc, onSnapshot, setDoc, collection } from "firebase/firestore";

// 2. MUI 
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// 3. Context
import { useAuth } from "../contexts/AuthContext";

// 4. ReactJS
import { useEffect, useState } from "react";

// AXIOS
import axios from "axios";

//----------------------------------------------------------- MAIN FUNCTION //
export default function AddFavorite(props) {

    // Dependency Instances
    const db = getFirestore(firebaseApp);
    const { currentUser } = useAuth();

    // State Variables
    const [favoriteList, setFavoriteList] = useState([]);
    const [openSnack, setOpenSnack] = useState(false);

    // ========================================== Getting User's Favorites //
    useEffect(() => {

        if (currentUser) {
            getFavorites(currentUser);
        }

        function getFavorites(user) {

            onSnapshot(collection(db, "users", user.uid, "favorites"), (querySnapshot) => {
                setFavoriteList([]);
                querySnapshot.forEach((doc) => {
                    setFavoriteList((prevArray) => [...prevArray, doc.id]);
                })
            });

        }

    }, [db, currentUser])



    // ========================================== Add To User's Favorites //
    async function addToFavorite(imdb) {

        try {
            setOpenSnack(true);

            const response = await axios.get("https://api.tvmaze.com/lookup/shows", {
                params: {
                    imdb: imdb
                }
            })

            await setDoc(doc(db, "users", currentUser.uid, "favorites", imdb), response.data);

        } catch (error) {

            console.log(error);

        }

    }

    // ========================================== Close Snackbar notification //
    const handleClose = () => {
        setOpenSnack(false);
    }

    //----------------------------------------------------------- RENDER //
    return (
        <>
            {
                (!favoriteList.includes(props.imdb))
                    ? <Tooltip title="Add to favorite">
                        <IconButton onClick={() => addToFavorite(props.imdb)} > <FavoriteBorderIcon color="secondary" fontSize="large" /> </IconButton>
                    </Tooltip>
                    : <IconButton disabled><FavoriteIcon color="secondary" fontSize="large" /></IconButton>
            }
            <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Added to favorites"
            />
        </>
    )

}