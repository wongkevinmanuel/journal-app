import { Grid, Typography } from '@mui/material'
import { StarOutline } from '@mui/icons-material'


export const NothingSelectedView = () => {
  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center' 
      sx={{ minHeight: 'calc(100vh - 150px)'
        , backgroundColor: 'primary.main', borderRadius:3}}
      >
        <Grid container spacing={1}>
            <Grid size={5}>
                <StarOutline sx={{ fontSize: 90, color: 'white'}}/>
            </Grid>
            <Grid size={7}>
                <Typography color='white' variant='h6'>
                    Seleccionar o crear una entrada
                </Typography>
            </Grid>
        </Grid>
        
    </Grid>
  )
}
