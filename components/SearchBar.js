//----------------------------------------------------------- DEPENDENCIES //
// 1. NextJS
import { useRouter } from "next/router";

// 2. MUI
import { FormControl, TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";

// 4. ReactJS
import { useRef } from "react";
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
export default function SearchBar() {

    // Dependency Instances
    const router = useRouter();
    const classes = useStyles();

    // Reference Variables For Search Query
    const queryRef = useRef();

    // ========================================== Search //
    function handleSubmit(e) {
        e.preventDefault();
        router.push(`/shows/${queryRef.current.value}`);
    }

    //----------------------------------------------------------- RENDER //
    return (
        <form autoComplete="off" onSubmit={handleSubmit}>

            <FormControl className={classes.formField}>
                <TextField
                    className={classes.textFieldCorners}
                    type="text"
                    label="Search"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    inputRef={queryRef}
                    color="secondary"
                />
                <Button
                    className={classes.buttonCorners}
                    type="submit"
                    variant="contained"
                    endIcon={<SearchIcon />}
                    color="secondary"
                    disableElevation
                >
                    Search
                </Button>
            </FormControl>

        </form>
    )
}