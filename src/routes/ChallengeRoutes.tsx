import { Navigate, Route, Routes } from 'react-router-dom'
import {
  ChallengePage,
  SearchPage,
  TitleIdPage,
  TitleTypePage,
  TopTitlePage,
  TypeMediaPage,
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
          <Route path=':typeMedia/:typeSearch' element={<TypeMediaPage />} />
          <Route path='/card/:titulo/:id' element={<TitleIdPage />} />
          <Route path='/' element={<ChallengePage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}
