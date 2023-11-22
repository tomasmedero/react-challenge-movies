//API
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ

import { TitleInfo } from '../types/types'

//Poster
//https://image.tmdb.org/t/p/w500/[PosterLink]

type Props = {
  titleType: string
}

export const getAPITop = async (props: Props): Promise<TitleInfo[]> => {
  const { titleType } = props
  const url = `https://api.themoviedb.org/3/trending/${titleType}/week?language=es-ES`
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

    if (titleType === 'movie') {
      name = title.title
      originalName = title.original_title
      releaseDay = title.release_date
    } else if (titleType === 'tv') {
      name = title.name
      originalName = title.original_name
      releaseDay = title.first_air_date
    }

    const {
      id,
      overview: description,
      media_type: programType,
      poster_path: posterUrl,
      vote_average,
    } = title
    const rating = vote_average.toFixed(1)

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
