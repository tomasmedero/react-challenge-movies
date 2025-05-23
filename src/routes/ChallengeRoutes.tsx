import { Navigate, Route, Routes } from 'react-router-dom'
import {
  ChallengePage,
  FavoritesPage,
  TitleIdPage,
  TitleTypePage,
  TopTitlePage,
  TypeMediaPage,
  SearchPage,
} from '../pages'
import { Navbar } from '../components'

export const ChallengeRoutes = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='search/:searchQuery' element={<SearchPage />} />
          <Route path='tendency/:typeMedia' element={<TopTitlePage />} />
          <Route path=':typeMedia' element={<TitleTypePage />} />
          <Route path='favorites' element={<FavoritesPage />} />
          <Route path=':typeMedia/:typeSearch' element={<TypeMediaPage />} />
          <Route path='/card/:typeMedia/:id' element={<TitleIdPage />} />
          <Route path='/' element={<ChallengePage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}
