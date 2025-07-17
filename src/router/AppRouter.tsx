import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components/CheckingAuth';

import { useCheckAuth } from '../hooks/useCheckAuth';

export const AppRouter = () => {
  
  //Disparar efecto para cambiar la pantalla
  //si persona esta autenticado o no
  //Firebase Pendiente de los cambios de
  //usuario (Estar pendiende de manera dinamica) 
  // onAuthStateChanged  
  const status = useCheckAuth();
  
  if(status === 'checking'){
      return <CheckingAuth/>
  }
  
  return (
    <Routes>
      {/*Manejo de autenticacion */}
      { 
        (status === 'authenticated')
        ? <Route path='/*' element={<JournalRoutes/>}/>
        : <Route path='/auth/*' element={<AuthRoutes />}></Route>
      }

      <Route path='/*' element={<Navigate to='/auth/login'/>} />
    </Routes>
  )
}
