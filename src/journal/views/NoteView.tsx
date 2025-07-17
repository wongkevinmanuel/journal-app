import { useEffect, useMemo, useRef } from 'react';
import { DeleteOutlined, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import Swal from 'sweetalert2'; 
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components/ImageGallery'
import { useForm } from '../../hooks/useForm'; 
import { setActiveNote, startDeletingNote, startSaveNote, starUploadingFiles } from '../../store/journal';

export const NoteView = () => {
    const dispatch = useAppDispatch();
    const { active, messagesSaved , isSaving } = useAppSelector((state) => state.journal);

    //UseForm hook se encarga de manejar el estado del formulario
    const { formState, onInputChange } = useForm(active!);
    const { date, title, body } = formState;
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const dateFormateada = useMemo(() =>{
        const newDate = new Date(date);
        return newDate.toUTCString();
    },[date]);

    //Store journal/active 
    //Active siempre tendra los ultimos cambios del formulario
    useEffect(() =>{
        dispatch( setActiveNote( { 
            id: active?.id,
            title: title,
            body: body,
            date: date,
            imageUrls: active?.imageUrls || []
        }) );

    },[ title, body]);

    //Disparar mensaje error si la variable de messagesSaved no esta vacia
    useEffect(() =>{
        if( messagesSaved.length > 0){
            Swal.fire('Información sobre Nota', messagesSaved, 'success');
        }
    }, [messagesSaved])

    const onClickSaveNote = () =>{
        dispatch(startSaveNote());
    }

    const onFileInputChange = ( event: React.ChangeEvent<HTMLInputElement>)=> {
        try{
            if( event.target.files?.length === 0 ) return;
        }catch ( error ) {
            console.log(error);
        }

        dispatch ( starUploadingFiles( event.target.files! ) );
    }

    const onClickDelete = ()=>{
        dispatch(startDeletingNote());
    }

  return (
    <Grid container direction='row' spacing={1} justifyContent='space-between' 
        alignItems='center' sx={{mb: 1}}

       className='form-container active-form'>

        <Typography variant='h6' fontSize={20} fontWeight='light'>
            {dateFormateada}
        </Typography>

        <input type='file' multiple
            style={{display: 'none'}}
            onChange={onFileInputChange}
            ref={fileInputRef}>
        </input>
        <IconButton color='primary'
            disabled={ isSaving }
            onClick={() => fileInputRef.current?.click() }>
            <UploadOutlined />
        </IconButton>
        
        <TextField  
            type='text'
            variant='filled'
            fullWidth
            placeholder='Ingrese un título'
            name='title'
            value={title }
            onChange={onInputChange}
            label='Título'
            sx={{border:'-moz-initial', mb: 1}}
            className='note-title'></TextField>
        <TextField
            type='text'
            variant='filled'
            fullWidth
            multiline
            placeholder='¿Qué sucedió en el día de hoy?'
            name='body'
            value={body }
            onChange={onInputChange}
            label='Descripción'
            minRows={4}
            sx={{border:'-moz-initial', mb: 1}}
            className='note-text'></TextField>
        
        <ImageGallery images={ active?.imageUrls! }/>
        
        <Button color='primary' sx={{padding: 2}}
            onClick={onClickSaveNote}>
            <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
            Guardar
        </Button>
        <Button color='error' sx={{padding: 2}}
            onClick={onClickDelete}>
            <DeleteOutlined sx={{fontSize: 30, mr: 1}}>
            </DeleteOutlined>
            Borrar
        </Button>
    </Grid>
  )
}
