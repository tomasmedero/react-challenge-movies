import { SearchData, SearchResponse, TitleInfo } from '../types/types'

type Props = {
  searchQuery: string
  page?: number
  signal?: AbortSignal
}

const restrictedTerms = [
  'porn',
  'porno',
  'pornografia',
  'pornography',
  'xxx',
  'hentai',
  'erotica',
]

const normalizeQuery = (query: string) =>
  query
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export const isRestrictedSearchQuery = (query: string) => {
  const normalizedQuery = normalizeQuery(query)
  return restrictedTerms.some((term) =>
    new RegExp(`(^|\\W)${term}(\\W|$)`, 'i').test(normalizedQuery)
  )
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return ''

  const date = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export const getAPISearch = async ({
  searchQuery,
  page = 1,
  signal,
}: Props): Promise<SearchResponse> => {
  if (isRestrictedSearchQuery(searchQuery)) {
    return { results: [], page: 1, totalPages: 1 }
  }

  const params = new URLSearchParams({
    query: searchQuery,
    include_adult: 'false',
    language: 'es-ES',
    page: String(page),
  })
  const url = `https://api.themoviedb.org/3/search/multi?${params}`

  const res = await fetch(url, {
    method: 'GET',
    signal,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ',
    },
  })

  if (!res.ok) {
    throw new Error(`TMDB respondió con el estado ${res.status}`)
  }

  const data = await res.json()
  const results: TitleInfo[] = (data.results as SearchData[])
    .filter(
      ({ media_type, adult }) =>
        !adult && (media_type === 'movie' || media_type === 'tv')
    )
    .map((search) => {
      const isMovie = search.media_type === 'movie'

      return {
        id: search.id,
        name: (isMovie ? search.title : search.name) || 'Sin título',
        originalName:
          (isMovie ? search.original_title : search.original_name) || '',
        description: search.overview || 'Sin descripción disponible.',
        programType: isMovie ? 'Película' : 'Serie TV',
        posterUrl: search.poster_path
          ? `https://image.tmdb.org/t/p/w500/${search.poster_path}`
          : '/posterWhite.jpg',
        releaseDay: formatDate(
          isMovie ? search.release_date : search.first_air_date
        ),
        rating: Number(search.vote_average.toFixed(1)),
        media_type: search.media_type,
      }
    })

  return {
    results,
    page: data.page,
    totalPages: Math.min(data.total_pages, 500),
  }
}
