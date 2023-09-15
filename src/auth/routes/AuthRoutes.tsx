import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, Register2Page, RegisterPage } from '../pages'
import { Login2Page } from '../pages/Login2Page'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='login2' element={<Login2Page />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='register2' element={<Register2Page />} />

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
