//----------------------------------------------------------- DEPENDENCIES //
// 1. NextJS
import { useRouter } from "next/router";

// 2. MUI 
import { Box, Container, FormControl, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";

// 3. Context
import { useAuth } from "../contexts/AuthContext"

// 4. ReactJS
import { useEffect, useRef, useState } from "react";

// COMPONENTS
import Loader from "../components/Loader";
import Image from "next/image";
// ========================================== Custom Styling //
const useStyles = makeStyles({
    formField: {
        display: "flex",
        flexDirection: "row"
    },
    textFieldCorners: {
        [`& fieldset`]: {
            borderRadius: `5px 0 0 5px`
        }
    },
    buttonCorners: {
        borderRadius: `0 5px 5px 0`
    }
})
//----------------------------------------------------------- MAIN FUNCTION //
export default function search() {

    // Dependency Instances
    const router = useRouter();
    const { currentUser } = useAuth();
    const classes = useStyles();

    // Reference Variables For Search Query
    const queryRef = useRef();

    // State Variables
    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    // ========================================== Redirect //
    useEffect(() => {

        if (currentUser === null) {
            router.push("/signin");
        }
        if (currentUser !== null) {
            setUserLoading(false);
        }

    }, [currentUser])

    // ========================================== Search //
    function handleSubmit(e) {

        e.preventDefault();
        setLoading(true);
        router.push(`/shows/${queryRef.current.value}`);

    }

    //----------------------------------------------------------- RENDER //
    return (
        <Container>
            {
                userLoading
                    ? <Loader />
                    : <Box sx={{ textAlign: "center" }}>
                        <Image src="/encyclopedia.png" width={512} height={512} />
                        <form autoComplete="off" onSubmit={handleSubmit}>

                            <FormControl className={classes.formField}>
                                <TextField
                                    className={classes.textFieldCorners}
                                    type="text"
                                    label="Search"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    inputRef={queryRef}
                                    color="secondary"
                                />
                                <LoadingButton
                                    className={classes.buttonCorners}
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    endIcon={<SearchIcon />}
                                    loading={loading}
                                    loadingPosition="end"
                                    color="secondary"
                                    disableElevation
                                >
                                    Search
                                </LoadingButton>
                            </FormControl>


                        </form>
                    </Box>

            }
        </Container>
    )
}