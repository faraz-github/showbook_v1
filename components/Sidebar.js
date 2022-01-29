//----------------------------------------------------------- DEPENDENCIES //
// 1. NextJS
import { useRouter } from "next/router";

// 2. MUI
import Drawer from "@mui/material/Drawer";
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useTheme } from "@mui/styles";

// Constants
const drawerWidth = 240;
//----------------------------------------------------------- MAIN FUNCTION //
export default function Sidebar({ open, handleCloseDrawer }) {

    // Dependency Instances
    const router = useRouter();
    const theme = useTheme();

    //----------------------------------------------------------- RENDER //
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: theme.palette.secondary.main
                },
            }}
            open={open}
            anchor='left'
            onClose={handleCloseDrawer}
        >
            <Typography
                padding={1}
                variant="h5"
                gutterBottom
                color="primary"
            >
                Showbook Menu
            </Typography>

            <Divider />

            <List>

                <ListItemButton onClick={() => {
                    handleCloseDrawer();
                    router.push("/signup")
                }
                }>
                    <ListItemIcon><AppRegistrationIcon color="primary" /></ListItemIcon>
                    <ListItemText sx={{ color: theme.palette.primary.dark }} primary="Sign Up" />
                </ListItemButton>

                <ListItemButton onClick={() => {
                    handleCloseDrawer();
                    router.push("/signin")
                }
                }>
                    <ListItemIcon><LoginIcon color="primary" /></ListItemIcon>
                    <ListItemText sx={{ color: theme.palette.primary.dark }} primary="Sign In" />
                </ListItemButton>

                <ListItemButton onClick={() => {
                    handleCloseDrawer();
                    router.push("/reset")
                }
                }>
                    <ListItemIcon><ManageAccountsIcon color="primary" /></ListItemIcon>
                    <ListItemText sx={{ color: theme.palette.primary.dark }} primary="Reset Password" />
                </ListItemButton>

            </List>

        </Drawer>
    )

}