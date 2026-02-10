import React ,  { useMemo } from 'react'
import { Link as RouterLink} from 'react-router-dom'

import { Alert, Box, Button, Divider, FormControl, Grid, Link, TextField, Typography } from '@mui/material'
import { Facebook, Google } from '@mui/icons-material'

import { AuthLayer } from '../layout/AuthLayer'
import { useForm } from '../../hooks/useForm'

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'

const formData = {
    email: '',
    password: ``,
}

const formValidations = {
  email:      [ (value:string )=> value.includes(`@`), `El correo debe tener un @.`],
  password:   [ (value:string )=> value.length >= 6 , `La contraseña debe tener al menos 6 caracteres.`]
}

export const LoginPage = () => {
  
  const dispatch = useAppDispatch();
  const { status,errorMessage } = useAppSelector( state => state.auth);
  
  //Si es status cambia se vuelva a renderizar el componente con el nuevo status
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const { formState, onInputChange, isFormValid, formValidation } = useForm(formData, formValidations);
  const { email, password } = formState;
  const { emailValid, passwordValid } = formValidation;

 
  const handleSubmit = ( e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();

    if(!isFormValid ) return;

    dispatch( startLoginWithEmailPassword(email,password) );
  }

  const onGoogleSignIn= (e: React.MouseEvent<HTMLButtonElement>)=>{
    dispatch(startGoogleSignIn() );
  } 

  return (
    <AuthLayer title='Login'> 
            <Box 
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
              className='animate__animated animate__fadeIn animate__faster'>

              <FormControl>
                <TextField
                  label="Correo"
                  type='email'
                  placeholder='Correo@google.com'
                  variant='outlined'
                  name='email'
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid}
                  helperText={emailValid}
                  fullWidth>
                </TextField>
              </FormControl>
              <FormControl>
                <TextField 
                  label="Contraseña"
                  type='password'
                  placeholder='Contraseña'
                  variant='outlined'
                  name='password'
                  value={password}
                  onChange={onInputChange}
                  error={!!passwordValid}
                  helperText={passwordValid}
                  fullWidth>
                </TextField>
              </FormControl>
              <Grid display={ !!errorMessage ? '': 'none'}>
                <Alert severity='error'>
                  { errorMessage }
                </Alert>
              </Grid>
              <Button
                disabled={isAuthenticating}
                type='submit'
                variant='contained'
                fullWidth>
                Ingresar
              </Button>
            </Box>
            <Divider> o </Divider>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
              <Button 
                disabled={isAuthenticating}
                variant='outlined'
                onClick={onGoogleSignIn}
                startIcon={<Google/>}
                fullWidth
                aria-label='google-btn'>

                Ingresar con Google
              </Button>
              <Button 
              disabled={isAuthenticating}
                variant='outlined'
                onClick={()=> alert('Sign in With Facebook')}
                startIcon={<Facebook/>}
                fullWidth>
                Ingresar con Facebook
              </Button>
              <Typography>
                <Link 
                color='inherit' 
                to={'/auth/register'} 
                component={RouterLink} 
                sx={{mr: 1, alignSelf: 'center' }}>
                 Crear una cuenta
                 </Link>
              </Typography>
            </Box> 
    </AuthLayer>    
  )
}
