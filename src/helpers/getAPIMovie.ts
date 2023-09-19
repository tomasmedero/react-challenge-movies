import { MovieInfo } from '../types/types'

//API eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ

export const getAPIMovies = async (): Promise<MovieInfo[]> => {
  const url = 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES'

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ',
    },
  }

  fetch(url, options)
  const res = await fetch(url, options)

  const data = await res.json()

  const movieData: MovieInfo[] = []

  data.results.forEach((movie: any) => {
    const id = movie.id
    const title = movie.title
    const originalTitle = movie.original_title
    const description = movie.overview
    const programType = movie.media_type
    const posterUrl = movie.poster_path
    const releaseDay = movie.release_date

    const movieRes: MovieInfo = {
      id: id,
      title: title,
      originalTitle: originalTitle,
      description: description,
      programType: programType,
      posterUrl: posterUrl,
      releaseDay: releaseDay,
    }

    movieData.push(movieRes)
  })

  return movieData
}
