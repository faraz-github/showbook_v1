//----------------------------------------------------------- DEPENDENCIES //
// 1. NextJS
import { useRouter } from "next/router";
import Link from "next/link";

// 2. MUI
import { Alert, Container, FormControl, TextField, Typography } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { LoadingButton } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/styles";

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
export default function signup() {

    // Dependency Instances
    const router = useRouter();
    const { currentUser, signup } = useAuth();
    const theme = useTheme();
    const classes = useStyles();

    // State Variables
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Reference Variables For Signup Information
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    // ========================================== Redirect //
    useEffect(() => {
        if (currentUser !== null) {
            router.push("/search");
        }
    }, [currentUser])

    // ========================================== Signup //
    async function handleSubmit(e) {

        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            setError(error.code.slice(5, error.code.length).replace(/(-)/ig, ' ').replace(/^\w/, c => c.toUpperCase()));
            // slice >> replace dash with space >> capitalise first alphabet to uppercase.
        }
        setLoading(false);

    }

    //----------------------------------------------------------- RENDER //
    return (
        <Container className={classes.credentialContainer}>

            <Typography variant="h2" gutterBottom>Sign Up</Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <form autoComplete="off" onSubmit={handleSubmit}>

                <FormControl className={classes.credentialField}>
                    <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        inputRef={emailRef}
                    />
                </FormControl>
                <FormControl className={classes.credentialField}>
                    <TextField
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        inputRef={passwordRef}
                    />
                </FormControl>
                <FormControl className={classes.credentialField}>
                    <TextField
                        type="password"
                        label="Password Confirmation"
                        variant="outlined"
                        fullWidth
                        required
                        inputRef={passwordConfirmRef}
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
                        Sign up
                    </LoadingButton>
                </FormControl>

            </form>

            <Typography
                variant="subtitle1"
                sx={{ textAlign: "center" }}
            >
                Already have an account? <Link href="/signin"><a style={{ color: theme.palette.primary.main }}>Sign In</a></Link>
            </Typography>

        </Container>
    )
}