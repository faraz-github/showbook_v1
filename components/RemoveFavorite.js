//----------------------------------------------------------- DEPENDENCIES //
// 0. Firebase
import { firebaseApp } from "../firebase";
import { getFirestore, doc, onSnapshot, setDoc, collection, deleteDoc } from "firebase/firestore";

// 2. MUI 
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

// 3. Context
import { useAuth } from "../contexts/AuthContext";

// 4. ReactJS
import { useEffect, useState } from "react";

//----------------------------------------------------------- MAIN FUNCTION //
export default function RemoveFavorite(props) {

    // Dependency Instances
    const db = getFirestore(firebaseApp);
    const { currentUser } = useAuth();

    // State Variables
    const [favoriteList, setFavoriteList] = useState([]);

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


    // ========================================== Remove From User's Favorites //
    const [openSnack, setOpenSnack] = useState(false);
    async function removeFromFavorites(imdb) {
        try {
            setOpenSnack(true);



            await deleteDoc(doc(db, "users", currentUser.uid, "favorites", imdb));

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
                (favoriteList.includes(props.imdb))
                    ? <Tooltip title="Remove">
                        <IconButton onClick={() => removeFromFavorites(props.imdb)} > <FavoriteIcon color="secondary" fontSize="large" /> </IconButton>
                    </Tooltip>
                    : null
            }
            <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Removed Favorite"
            />
        </>
    )

}