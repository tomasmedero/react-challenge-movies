import { FlatRateProps, TitleInfo } from '../types/types'
import { countryCode } from './countryCode'

type Props = {
  id: number
  typeMedia: string
  countryName?: string
}

type ProviderCountry = {
  link?: string
  flatrate?: FlatRateProps[]
  rent?: FlatRateProps[]
  buy?: FlatRateProps[]
}

export const getTitleById = async ({
  id,
  typeMedia,
  countryName,
}: Props): Promise<TitleInfo | null> => {
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

  try {
    const [res, resNetwork] = await Promise.all([
      fetch(url, options),
      fetch(urlNetworks, options),
    ])

    if (!res.ok || !resNetwork.ok) {
      throw new Error(`TMDB respondió con estado ${res.status}/${resNetwork.status}`)
    }

    const [data, dataNetwork] = await Promise.all([
      res.json(),
      resNetwork.json(),
    ])
    const isMovie = typeMedia === 'movie'
    const releaseDate = isMovie ? data.release_date : data.first_air_date
    const selectedCountryCode = countryCode[countryName || 'Argentina'] || 'AR'
    const providers: ProviderCountry =
      dataNetwork.results?.[selectedCountryCode] || {}

    return {
      id: data.id,
      name: isMovie ? data.title : data.name,
      originalName: isMovie ? data.original_title : data.original_name,
      description: data.overview || 'Sin descripción disponible.',
      posterUrl: data.poster_path
        ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
        : '/posterWhite.jpg',
      backdropUrl: data.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
        : undefined,
      releaseDay: releaseDate ? Number(releaseDate.slice(0, 4)) : '',
      rating: Number(data.vote_average.toFixed(1)),
      seasons: isMovie ? undefined : data.number_of_seasons,
      episodes: isMovie ? undefined : data.number_of_episodes,
      runtime: isMovie ? data.runtime : undefined,
      genres: data.genres,
      watchProviderLink: providers.link || '',
      watchProviderFlatrate: providers.flatrate || [],
      watchProviderRent: providers.rent || [],
      watchProviderBuy: providers.buy || [],
      media_type: typeMedia,
      programType: isMovie ? 'Película' : 'Serie TV',
    }
  } catch (error) {
    console.error('No se pudieron cargar los datos del título:', error)
    return null
  }
}
