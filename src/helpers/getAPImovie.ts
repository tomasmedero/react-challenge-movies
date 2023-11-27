import { SearchData, TitleInfo } from '../types/types'

type Props = {
  queryType: string
}

// now_playing, popular, top_rated, upcoming
export const getAPImovie = async (props: Props): Promise<TitleInfo[]> => {
  const { queryType } = props

  const url = `https://api.themoviedb.org/3/movie/${queryType}?language=es-ES&page=1'`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ',
    },
  }

  const res = await fetch(url, options)

  const data = await res.json()

  const movieData: TitleInfo[] = data.results.map((movie: SearchData) => {
    const programType = 'movie'

    const {
      id,
      overview: description,
      vote_average,
      title: name,
      original_title: originalName,
      release_date: releaseDay,
    } = movie
    const rating = vote_average.toFixed(1)
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      : '/posterWhite.jpg'

    return {
      id,
      name,
      originalName,
      description,
      programType,
      posterUrl,
      releaseDay,
      rating,
    }
  })
  return movieData
}
