import { TitleInfo } from '../types/types'

type Props = {
  queryType: string
}

// TODO airing_today - on_the_air - popular - top_rated

export const getAPItv = async (props: Props): Promise<TitleInfo[]> => {
  const { queryType } = props

  const url = `https://api.themoviedb.org/3/tv/${queryType}?language=es-ES&page=1'`

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

  const tvData: TitleInfo[] = data.results.map((tv: any) => {
    const programType = 'tv'

    const {
      id,
      overview: description,
      vote_average,
      name,
      original_name: originalName,
      first_air_date: releaseDay,
      popularity,
    } = tv
    const rating = vote_average.toFixed(1)
    const posterUrl = tv.poster_path
      ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
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
      popularity,
    }
  })
  return tvData
}
