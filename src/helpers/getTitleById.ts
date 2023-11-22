//API eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ

import { TitleInfo } from '../types/types'

type Props = {
  id: any
  titleTypeInfo: string
}

export const getTitleById = async (props: Props): Promise<TitleInfo | null> => {
  const { id, titleTypeInfo } = props
  const url = `https://api.themoviedb.org/3/${titleTypeInfo}/${id}?language=es-ES`
  const urlNetworks = `https://api.themoviedb.org/3/${titleTypeInfo}/${id}/watch/providers`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ',
    },
  }

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

    if (titleTypeInfo === 'tv') {
      releaseDay = data.first_air_date
      name = data.name
      originalName = data.original_name
      seasons = data.number_of_seasons
      episodes = data.number_of_episodes
    } else if (titleTypeInfo === 'movie') {
      releaseDay = data.release_date
      name = data.title
      originalName = data.original_title
      runtime = data.runtime
    }
    const posterUrl = data.poster_path
    const year = parseInt(releaseDay.split('-')[0])

    const rating = parseFloat(data.vote_average.toFixed(1))
    const genres = data.genres

    if (dataNetwork.results && dataNetwork.results.AR) {
      watchProviderLink = dataNetwork.results.AR.link || ''
      watchProviderFlatrate = dataNetwork.results.AR.flatrate || ''
    }

    const titleRes: TitleInfo = {
      id: id,
      name: name,
      originalName: originalName,
      description: description,
      posterUrl: posterUrl,
      releaseDay: year,
      rating: rating,
      seasons: seasons,
      episodes: episodes,
      runtime: runtime,
      genres: genres,
      watchProviderLink: watchProviderLink,
      watchProviderFlatrate: watchProviderFlatrate,
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
