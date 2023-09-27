import { Navigate, Route, Routes } from 'react-router-dom'
import { ChallengePage, IdPage, TitlePage } from '../pages'
import { Navbar } from '../components'

export const ChallengeRoutes = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='tv' element={<TitlePage />} />
          <Route path='movie' element={<TitlePage />} />
          <Route path='/:titulo/:id' element={<IdPage />} />
          <Route path='/' element={<ChallengePage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}
