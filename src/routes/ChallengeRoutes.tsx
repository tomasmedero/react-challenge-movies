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
          <Route path='tv/top20' element={<TopTitlePage />} />
          <Route path='movie/top20' element={<TopTitlePage />} />
          <Route path='movie/search' element={<SearchPage />} />
          <Route path='tv/search' element={<SearchPage />} />
          <Route
            path='movie'
            element={<TitleTypePage pageInfo='Peliculas' />}
          />
          <Route path='tv' element={<TitleTypePage pageInfo='Series' />} />
          <Route path='/:titulo/:id' element={<TitleIdPage />} />
          <Route path='/' element={<ChallengePage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}
