import { AccountCircle, MenuOutlined } from '@mui/icons-material'
import { AppBar, Box, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { startLogout } from '../../store/auth/thunks'

interface NavBarProps{
    drawerWidth?: string | number
}

type Props = { 
    drawerWidth? : string  | number
 }

//export const NavBar = ({drawerWidth}:NavBarProps) => {
export const NavBar: FC<Props> = ({ drawerWidth = 240 }) => {
    
    const { displayName} = useAppSelector( state => state.auth);
    const dispatch = useAppDispatch();

    //Manejo del menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    const handleClose = ()=>{
        //alert('Programar el Logout');
        setAnchorEl(null);
    }

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(startLogout() );
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
  };

  //onClose={handleClose}
  
  return (
    <Box sx={{ flexGrow: 1}}>
        <AppBar 
            position='fixed'
            sx={{
                width: { sm:`calc(100% - ${ drawerWidth }px `},
                ml: { sm: `${ drawerWidth }px `}
            }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}>
                    <MenuOutlined/>
                </IconButton>
                <Typography variant='h6'component="div" sx={{ flexGrow: 1 }}>
                        <Typography variant='h6' noWrap component='div'> JournalApp </Typography>
                </Typography>
                <Grid container direction='row' justifyContent='space-between' alignItems=''>
                    <Typography> { displayName } </Typography>
                </Grid>
                <div>
                    <IconButton 
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit">
                        <AccountCircle/>
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
                    onClose={handleClose}>
                        <MenuItem >Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    </Box>
  )
}
