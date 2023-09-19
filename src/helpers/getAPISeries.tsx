import { SeriesInfo } from '../types/types'

//API
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ

//Poster
//https://image.tmdb.org/t/p/w500/[PosterLink]

export const getAPISeries = async (): Promise<SeriesInfo[]> => {
  const url = 'https://api.themoviedb.org/3/trending/tv/week?language=es-ES'
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

  const seriesData: SeriesInfo[] = []

  data.results.forEach((serie: any) => {
    const id = serie.id
    const name = serie.name
    const originalName = serie.original_name
    const description = serie.overview
    const programType = serie.media_type
    const posterUrl = serie.poster_path
    const releaseDay = serie.first_air_date

    const seriesRes: SeriesInfo = {
      id: id,
      name: name,
      originalName: originalName,
      description: description,
      programType: programType,
      posterUrl: posterUrl,
      releaseDay: releaseDay,
    }

    seriesData.push(seriesRes)
  })

  return seriesData
}
