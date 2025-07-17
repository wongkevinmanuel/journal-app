import { IconButton, Typography } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { startNewNote } from '../../store/journal'

export const JournalPage = () => {

  const dispatch = useAppDispatch();
  const { isSaving, active } = useAppSelector((state) => state.journal); 

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout> 
      {
        (!!active) 
          ? <NoteView></NoteView> 
          : <NothingSelectedView/>
      }
      <IconButton 
        size='large'
        sx={{
          color:'white',
          backgroundColor:'error.main',
          ':hover': {backgroundColor:'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        onClick={onClickNewNote}
        disabled={isSaving}
        >
        <AddOutlined sx={{fontSize: 25, color: 'white'}}/>
      </IconButton>
    </JournalLayout>
  )
}
