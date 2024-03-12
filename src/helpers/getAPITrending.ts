//API
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ

import { SearchData, TitleInfo } from '../types/types'

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

  const titleData: TitleInfo[] = data.results.map((title: SearchData) => {
    let name, originalName, releaseDay, programType, rating, posterUrl

    const { id, overview: description } = title

    const media_type = title.media_type ? title.media_type : searchType

    if (media_type === 'movie') {
      name = title.title
      originalName = title.original_title
      releaseDay = title.release_date
      programType = 'Pelicula'
      rating = title.vote_average.toFixed(1)
      posterUrl = title.poster_path
        ? `https://image.tmdb.org/t/p/w500/${title.poster_path}`
        : '/posterWhite.jpg'
    } else if (media_type === 'tv') {
      name = title.name
      originalName = title.original_name
      releaseDay = title.first_air_date
      programType = 'Serie Tv'
      rating = title.vote_average.toFixed(1)
      posterUrl = title.poster_path
        ? `https://image.tmdb.org/t/p/w500/${title.poster_path}`
        : '/posterWhite.jpg'
    } else if (media_type === 'person') {
      name = title.name
      originalName = title.original_name
      programType = 'Persona'
      posterUrl = title.profile_path
        ? `https://image.tmdb.org/t/p/w500${title.profile_path}`
        : '/posterWhite.jpg'
    }

    return {
      id,
      name,
      originalName,
      description,
      programType,
      posterUrl,
      releaseDay,
      rating,
      media_type,
    }
  })

  return titleData
}
