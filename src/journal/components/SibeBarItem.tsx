import { Journal, setActiveNote } from '../../store/journal'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { useMemo } from 'react'
import { useAppDispatch } from '../../store/hooks'

export const SibeBarItem = (note:Journal) => {
    const  dispatch  = useAppDispatch();
    //Titulo no pase de una sola linea
    const newTitle = useMemo(() =>{
        return note.title.length > 17 
            ? note.title.substring(0, 17) + `...`
            : note.title;
    },[note.title])

    function onClickNote(): void {
        dispatch(setActiveNote(note));
    }

  return (
    <ListItem key={note.id} disablePadding>
         <ListItemButton onClick={onClickNote}>
             <ListItemIcon>
                 <TurnedInNot></TurnedInNot>
             </ListItemIcon>
             <Grid container>
                 <ListItemText primary={newTitle}/>
                 <ListItemText secondary={note.body}/>
             </Grid>
         </ListItemButton>
    </ListItem>
  )
}
