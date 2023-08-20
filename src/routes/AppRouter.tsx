import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ChallengePage, MoviesPage, SeriesPage } from '../pages'
import { InfoBar, Navbar } from '../components'
import { useEffect, useState } from 'react'

export const AppRouter = () => {
  const [info, setInfo] = useState<string>('Titles')
  const location = useLocation()

  useEffect(() => {
    let pageInfo: string = 'Titles'
    if (location.pathname === '/series') {
      pageInfo = 'Series'
    } else if (location.pathname === '/movies') {
      pageInfo = 'Movies'
    } else {
      pageInfo = 'Titles'
    }
    setInfo(pageInfo)
  }, [location.pathname])

  return (
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
  )
}
