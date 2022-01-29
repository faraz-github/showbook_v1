//----------------------------------------------------------- DEPENDENCIES //
// 1. NextJS
import { useRouter } from 'next/router';

// 2. MUI
import { AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

// 3. Context
import { useAuth } from "../contexts/AuthContext"

// 4. ReactJS
import { useState, useEffect } from 'react';

// COMPONENTS
import Sidebar from './Sidebar';
// ========================================== Custom Styling //
// This is for the Toolbar offset
import { styled } from '@mui/system';
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

//----------------------------------------------------------- MAIN FUNCTION //
export default function MenuAppBar() {

  // Dependency Instances
  const router = useRouter();
  const { currentUser, signout } = useAuth();

  // State Variables
  const [auth, setAuth] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // ========================================== Setting auth //
  useEffect(() => {
    if (currentUser !== null) {
      setAuth(true)
    } else {
      setAuth(false);
    }
  }, [currentUser])

  // ========================================== Sidebar Close //
  function handleCloseDrawer() {
    setOpenDrawer(false);
  }





  // ========================================== Open User Menu //
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // ========================================== Close User Menu //
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ========================================== Sign out //
  async function handleSignOut() {
    try {
      await signout();
      setAnchorEl(null);
    } catch (error) {
      console.log(error);
    }
  }
  //----------------------------------------------------------- RENDER //
  return (
    <>
      <AppBar position="fixed">

        <Toolbar>

          {
            !auth && <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          }

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Showbook
          </Typography>

          {
            auth && <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/profile");
                  }
                  }
                >Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </>
          }
        </Toolbar>
      </AppBar>
      <Offset />

      <Sidebar open={openDrawer} handleCloseDrawer={handleCloseDrawer} />

    </>
  )
}