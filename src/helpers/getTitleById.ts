//API eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ

import { TitleInfo } from '../types/types'
import { countryCode } from './countryCode'

type Props = {
  id: number
  typeMedia: string
  countryName?: string
}

export const getTitleById = async (props: Props): Promise<TitleInfo | null> => {
  const { id, typeMedia, countryName } = props
  const url = `https://api.themoviedb.org/3/${typeMedia}/${id}?language=es-ES`
  const urlNetworks = `https://api.themoviedb.org/3/${typeMedia}/${id}/watch/providers`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ',
    },
  }

  const countryCodeName = countryCode[countryName || 'Argentina']

  try {
    const res = await fetch(url, options)
    const data = await res.json()

    const resNetwork = await fetch(urlNetworks, options)
    const dataNetwork = await resNetwork.json()

    const id = data.id

    const description = data.overview

    let releaseDay
    let name
    let originalName
    let seasons
    let episodes
    let runtime
    let watchProviderLink = ''
    let watchProviderFlatrate = []

    if (typeMedia === 'tv') {
      releaseDay = data.first_air_date
      name = data.name
      originalName = data.original_name
      seasons = data.number_of_seasons
      episodes = data.number_of_episodes
    } else if (typeMedia === 'movie') {
      releaseDay = data.release_date
      name = data.title
      originalName = data.original_title
      runtime = data.runtime
    }

    const posterUrl = data.poster_path
      ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
      : '/posterWhite.jpg'
    const year = parseInt(releaseDay.split('-')[0])

    console.log(year)

    const rating = parseFloat(data.vote_average.toFixed(1))
    const genres = data.genres

    if (dataNetwork.results && dataNetwork.results[countryCodeName]) {
      watchProviderLink = dataNetwork.results[countryCodeName].link || ''
      watchProviderFlatrate =
        dataNetwork.results[countryCodeName].flatrate || ''
    }

    const titleRes: TitleInfo = {
      id,
      name,
      originalName,
      description,
      posterUrl,
      releaseDay: year,
      rating,
      seasons,
      episodes,
      runtime,
      genres,
      watchProviderLink,
      watchProviderFlatrate,
    }

    return titleRes
  } catch (error) {
    console.error(
      'Hubo un error cuando se quiso traer los datos de la API',
      error
    )
    return null
  }
}
