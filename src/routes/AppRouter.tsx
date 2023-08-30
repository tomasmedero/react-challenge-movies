import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ChallengePage, MoviesPage, SeriesPage } from '../pages'
import { InfoBar, Navbar } from '../components'
import { useEffect, useState } from 'react'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

export const AppRouter = () => {
  const [info, setInfo] = useState<string>('Titles')
  const location = useLocation()

  const status = 'autenticado'

  useEffect(() => {
    let pageInfo: string = 'Titles'
    if (location.pathname === '/series') {
      pageInfo = 'Series'
    } else if (location.pathname === '/movies') {
      pageInfo = 'Movies'
    } else if (location.pathname === '/') {
      pageInfo = 'Titles'
    }
    setInfo(pageInfo)
  }, [location.pathname])

  return (
    <>
      {status === 'autenticado' ? (
        <Routes>
          <Route path='/auth/*' element={<AuthRoutes />} />
          <Route path='/*' element={<Navigate to='/auth/login' />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <InfoBar pageInfo={info} />
          <div>
            <Routes>
              <Route path='series' element={<SeriesPage />} />
              <Route path='movies' element={<MoviesPage />} />
              <Route path='/' element={<ChallengePage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
          </div>
        </>
      )}
    </>
  )
}
