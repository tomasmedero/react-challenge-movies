import { Navigate, Route, Routes } from 'react-router-dom'
import {
  ChallengePage,
  SearchPage,
  TitleIdPage,
  TitleTypePage,
  TopTitlePage,
} from '../pages'
import { Navbar } from '../components'

export const ChallengeRoutes = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='tendency/:typeMedia' element={<TopTitlePage />} />
          <Route path='search/:typeMedia' element={<SearchPage />} />
          <Route path=':typeMedia' element={<TitleTypePage />} />
          <Route path='/:titulo/:id' element={<TitleIdPage />} />
          <Route path='/' element={<ChallengePage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}
