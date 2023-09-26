import { Navigate, Route, Routes } from 'react-router-dom'
import { ChallengePage, IdPage, TitlePage } from '../pages'

export const ChallengeRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='series' element={<TitlePage />} />
        <Route path='peliculas' element={<TitlePage />} />
        <Route path='card' element={<IdPage />} />
        <Route path='/' element={<ChallengePage />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}
