//API
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ

import { TitleInfo } from '../types/types'

//Poster
//https://image.tmdb.org/t/p/w500/[PosterLink]

type Props = {
  searchType: string
}

export const getAPITrending = async (props: Props): Promise<TitleInfo[]> => {
  const { searchType } = props
  const url = `https://api.themoviedb.org/3/trending/${searchType}/week?language=es-ES`
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

  const titleData: TitleInfo[] = data.results.map((title: any) => {
    let name, originalName, releaseDay

    if (searchType === 'movie') {
      name = title.title
      originalName = title.original_title
      releaseDay = title.release_date
    } else if (searchType === 'tv') {
      name = title.name
      originalName = title.original_name
      releaseDay = title.first_air_date
    }

    const {
      id,
      overview: description,
      media_type: programType,
      vote_average,
    } = title
    const rating = vote_average.toFixed(1)
    const posterUrl = title.poster_path
      ? `https://image.tmdb.org/t/p/w500/${title.poster_path}`
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

  return titleData
}
