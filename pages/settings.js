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
import { useAuth } from "../contexts/AuthContext"

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
export default function settings() {

    // Dependency Instances
    const router = useRouter();
    const { currentUser, updateUserEmail, updateUserPassword, updateUserProfile } = useAuth();
    const theme = useTheme();
    const classes = useStyles();

    // State Variables
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // Reference Variables For Update Information
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();

    // ========================================== Redirect //
    useEffect(() => {
        if (currentUser === null) {
            router.push("/signin");
        }
    }, [currentUser])

    // ========================================== Update Info //
    function handleSubmit(e) {

        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = [];
        setLoading(true);
        setError("");

        // Update Email
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(emailRef.current.value))
        }
        //Update Password
        if (passwordRef.current.value) {
            promises.push(updateUserPassword(passwordRef.current.value))
        }
        // Update Name
        if (nameRef.current.value) {
            promises.push(updateUserProfile(nameRef.current.value))
        }

        Promise.all(promises).then(() => {
            router.push("/profile")
        }).catch((error) => {
            setError(error.code.slice(5, error.code.length).replace(/(-)/ig, ' ').replace(/^\w/, c => c.toUpperCase()));
            // slice >> replace dash with space >> capitalise first alphabet to uppercase.
        }).finally(() => {
            setLoading(false);
        })

    }

    //----------------------------------------------------------- RENDER //
    return (
        <Container className={classes.credentialContainer}>

            {
                currentUser &&
                <>
                    <Typography variant="h4" gutterBottom>Update Profile</Typography>

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
                                defaultValue={currentUser.email}
                            />
                        </FormControl>
                        <FormControl className={classes.credentialField}>
                            <TextField
                                type="text"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                placeholder="Leave blank to keep the same"
                                inputRef={nameRef}
                                defaultValue={currentUser.displayName}
                            />
                        </FormControl>
                        <FormControl className={classes.credentialField}>
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                placeholder="Leave blank to keep the same"
                                inputRef={passwordRef}
                            />
                        </FormControl>
                        <FormControl className={classes.credentialField}>
                            <TextField
                                type="password"
                                label="Password Confirmation"
                                variant="outlined"
                                fullWidth
                                placeholder="Leave blank to keep the same"
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
                                Update
                            </LoadingButton>
                        </FormControl>

                    </form>

                    <Typography
                        sx={{ textAlign: "center" }}
                        variant="subtitle1"
                    >
                        <Link href="/profile"><a style={{ color: theme.palette.primary.main }}>Cancel</a></Link>
                    </Typography>
                </>
            }

        </Container>
    )
}