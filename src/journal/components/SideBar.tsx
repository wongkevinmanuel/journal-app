import { Box, Drawer, List } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { SibeBarItem } from './SibeBarItem'
import { FC } from 'react'

type SideBarProps = {
    drawerWidth?: string | number
}

export const SideBar:FC<SideBarProps> = ({drawerWidth}) => {
    const { notes  } = useAppSelector((state) => state.journal);
    
  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink: { sm: 0 } }}
        role='presentation'
        //nuevo
        aria-label='mailbox folders'
        >
        <Drawer
            variant='permanent'
            open
            sx={{
                display: { xs: 'block',
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } },
                }}>
                <List>
                 {notes.map(note =>(<SibeBarItem key={note.id} {...note} />))}
                </List>
        </Drawer>
    </Box>
  )
}
