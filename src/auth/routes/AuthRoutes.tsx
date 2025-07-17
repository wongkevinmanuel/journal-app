import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const AuthRoutes = () => {  
  return (
    <Routes>
        <Route path="login" element={<LoginPage></LoginPage>} />
        <Route path="register" element={<RegisterPage></RegisterPage>  } />
        {/* Si entra a authRoutes direccionar a Login.
         path=/* cualquier otra ruta que no se login o register tiene que 
         ir a auth/login */}
         <Route path="/*" element={<Navigate to="/auth/login"/>} />
    </Routes>
  )
}
