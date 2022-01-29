//----------------------------------------------------------- DEPENDENCIES //
// 1. NextJS
import { useRouter } from "next/router";

// 2. MUI
import { Alert, Container, FormControl, TextField, Typography } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { LoadingButton } from "@mui/lab";
import { makeStyles } from "@mui/styles";

// 3. Context
import { useAuth } from "../contexts/AuthContext";

// 4. ReactJS
import { useRef, useEffect, useState } from "react";
// ========================================== Custom Styling //
const useStyles = makeStyles({
    credentialContainer: {
        maxWidth: 400,
        marginTop: 100
    },
    credentialField: {
        marginTop: 20,
        marginBottom: 20,
        display: "block"
    }
})
//----------------------------------------------------------- MAIN FUNCTION //
export default function reset() {

    // Dependency Instances
    const router = useRouter();
    const { currentUser, resetPassword } = useAuth();
    const classes = useStyles();

    // State Variables
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Reference Variables For Reset Information
    const emailRef = useRef();

    // ========================================== Redirect //
    useEffect(() => {
        if (currentUser !== null) {
            router.push("/search");
        }
    }, [currentUser])

    // ========================================== Reset //
    async function handleSubmit(e) {

        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your email inbox for further steps");
        } catch (error) {
            console.log(error);
            setError(error.code.slice(5, error.code.length).replace(/(-)/ig, ' ').replace(/^\w/, c => c.toUpperCase()));
            // slice >> replace dash with space >> capitalise first alphabet to uppercase.
        }
        setLoading(false);

    }

    //----------------------------------------------------------- RENDER //
    return (
        <Container className={classes.credentialContainer}>

            <Typography variant="h4" gutterBottom>Password Reset</Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}

            <form autoComplete="off" onSubmit={handleSubmit}>

                <FormControl className={classes.credentialField}>
                    <TextField
                        type="email"
                        label="Account email"
                        variant="outlined"
                        fullWidth
                        required
                        inputRef={emailRef}
                    />
                </FormControl>

                <FormControl className={classes.credentialField}>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<KeyboardArrowRightIcon />}
                        loading={loading}
                        loadingPosition="end"
                        color="secondary"
                    >
                        Reset
                    </LoadingButton>
                </FormControl>

            </form>
            
        </Container>
    )
}