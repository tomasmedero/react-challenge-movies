import { SearchData, TitleInfo } from '../types/types'

type Props = {
  searchType: string
  searchQuery: string
}

export const getAPISearch = async (props: Props): Promise<TitleInfo[]> => {
  const { searchType, searchQuery } = props

  const url = `https://api.themoviedb.org/3/search/${searchType}?query=${searchQuery}&include_adult=true&language=es-ES&page=1`

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

  const searchData: TitleInfo[] = data.results.map((search: SearchData) => {
    let name, originalName, releaseDay, programType, rating, gender, posterUrl

    const { media_type, id, overview: description } = search

    if (media_type === 'movie' || searchType === 'movie') {
      name = search.title
      originalName = search.original_title
      releaseDay = search.release_date
      programType = 'Pelicula'
      rating = search.vote_average.toFixed(1)
      posterUrl = search.poster_path
        ? `https://image.tmdb.org/t/p/w500/${search.poster_path}`
        : '/posterWhite.jpg'
    } else if (media_type === 'tv' || searchType === 'tv') {
      name = search.name
      originalName = search.original_name
      releaseDay = search.first_air_date
      programType = 'Serie Tv'
      rating = search.vote_average.toFixed(1)
      posterUrl = search.poster_path
        ? `https://image.tmdb.org/t/p/w500/${search.poster_path}`
        : '/posterWhite.jpg'
    } else if (media_type === 'person' || searchType === 'person') {
      name = search.name
      originalName = search.original_name
      programType = 'Persona'
      posterUrl = search.profile_path
        ? `https://image.tmdb.org/t/p/w500${search.profile_path}`
        : '/posterWhite.jpg'
      if (Number(search.gender) === 1) {
        gender = 'Femenino'
      } else if (Number(search.gender) === 2) {
        gender = 'Masculino'
      }
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
      gender,
    }
  })

  return searchData
}
