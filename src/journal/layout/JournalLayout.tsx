import React, { FC } from 'react';
import { Box, Toolbar } from '@mui/material';
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';

type JournalLayoutProps = {
    children: React.ReactNode
}

const drawerWidth = 250;

export const JournalLayout:FC<JournalLayoutProps> = ({children}) => {
  return (
    <Box sx={{display:'flex'}} className='animate__animated animate__fadeIn animate__faster'>
        {/*Barra arriba user y menu icon*/}
        <NavBar drawerWidth={drawerWidth} />
        {/*Menu izquierda*/}
        <SideBar drawerWidth={drawerWidth} />
        <Box component='main' 
        sx={{flexGrow:1, padding:2}}>
            <Toolbar/>
            {children}
        </Box>
    </Box>
  )
}
