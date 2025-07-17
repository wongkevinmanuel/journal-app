import React, { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link, Box, Button, Divider, FormControl, TextField, Typography, Alert, Grid } from '@mui/material';
import { AuthLayer } from '../layout/AuthLayer'
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: ``,
  password: ``,
  displayName: ``
}

const formValidations = {
  email:      [ (value: string )=> value.includes(`@`), `El correo debe teber un @`],
  password:   [ (value: string )=> value.length >=6, `La contraseña debe tener al menos 6 caracteres`],
  displayName:[ (value: string )=> value.length >=1, `El nombre es obligatorio`],
}

export const RegisterPage = () => {
  const { status ,errorMessage } = useAppSelector(state => state.auth);
  const isChechingAuthentication  = useMemo(() => status === 'checking', [status]);
  
  const dispatch = useAppDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { formState, onInputChange, formValidation , isFormValid } = useForm(formData, formValidations );
  const { email, password, displayName } = formState; 
  const { emailValid, passwordValid, displayNameValid } = formValidation;

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch( startCreatingUserWithEmailPassword(email, password, displayName)); 
  } 
  return (
      <AuthLayer title='Register'>
        <Box 
          component='form'
          noValidate
          onSubmit={handleSubmit}
          className='animate__animated animate__fadeIn animate__faster'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}>
          <FormControl>
            <TextField 
              label="Nombre completo"
              type='text'
              placeholder='Nombre completo'
              variant='outlined'
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              fullWidth>
            </TextField>
          </FormControl>
          <FormControl>
            <TextField 
              label="Correo"
              type='email'
              placeholder='Correo@google.com'
              variant='outlined'
              name  ='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              fullWidth>
            </TextField>
          </FormControl>
          <Grid display={!!errorMessage ? '': 'none'}>
            <Alert severity='error'>
              { 'Error'}
            </Alert>
          </Grid>
          <Button 
              disabled={isChechingAuthentication}
               type='submit'
               variant='contained'
               fullWidth>
               Crear cuenta
          </Button>
          </Box>
          <Divider> o </Divider>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <Typography>
              Ya tienes una cuenta? 
              <Link 
              color='inherit' 
              to={'/auth/login'} 
              component={RouterLink} 
              sx={{mr: 1, alignSelf: 'center' }}>
               Ingresar
               </Link>
            </Typography>
          </Box>
      </AuthLayer>
  )
}
