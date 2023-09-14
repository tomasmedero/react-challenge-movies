import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { LoadingPage } from '../auth/pages'
import { ChallengeRoutes } from './ChallengeRoutes'

export const AppRouter = () => {
  const status = useCheckAuth()

  if (status === 'chequeando') {
    return <LoadingPage />
  }

  return (
    <>
      {status === 'autenticado' ? (
        <>
          <div>
            <Routes>
              <Route path='/*' element={<ChallengeRoutes />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path='/*' element={<ChallengeRoutes />} />
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      )}
    </>
  )
}
