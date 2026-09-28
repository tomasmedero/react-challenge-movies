import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingPage } from '../auth/pages'
import {
  CarouselComponent,
  NoResultComponent,
  Pagination,
  TitleCard,
} from '../components'
import { getAPISearch } from '../helpers'
import { TitleInfo } from '../types/types'

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [titles, setTitles] = useState<TitleInfo[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [retryCount, setRetryCount] = useState(0)
  const navigate = useNavigate()
  const { searchQuery: paramSearchQuery } = useParams()

  const fetchResults = useCallback(
    async (query: string, requestedPage: number, signal: AbortSignal) => {
      setIsLoading(true)
      setError('')

      try {
        const result = await getAPISearch({
          searchQuery: query,
          page: requestedPage,
          signal,
        })
        setTitles(result.results)
        setTotalPages(result.totalPages)
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
          return
        }
        setTitles([])
        setError('No pudimos cargar los resultados. Revisá tu conexión e intentá nuevamente.')
      } finally {
        if (!signal.aborted) setIsLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    if (!paramSearchQuery) return

    const controller = new AbortController()
    fetchResults(paramSearchQuery, page, controller.signal)
    return () => controller.abort()
  }, [fetchResults, page, paramSearchQuery, retryCount])

  useEffect(() => {
    setPage(1)
  }, [paramSearchQuery])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const query = searchQuery.trim()
    if (!query) return

    setPage(1)
    navigate(`/search/${encodeURIComponent(query)}`)
    setSearchQuery('')
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <form className='mx-3 my-2 sm:m-3' onSubmit={handleSubmit}>
        <label htmlFor='default-search' className='sr-only'>
          Buscar películas y series
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none'>
            <svg className='w-3 h-3 sm:w-4 sm:h-4 text-gray-500' aria-hidden='true' fill='none' viewBox='0 0 20 20'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full p-2 sm:p-4 pl-10 sm:pl-12 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Buscar películas y series...'
            required
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            autoComplete='off'
          />
          <button type='submit' className='text-white absolute right-1 sm:right-2.5 bottom-1 sm:bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2'>
            Buscar
          </button>
        </div>
      </form>

      {paramSearchQuery ? (
        isLoading ? (
          <LoadingPage />
        ) : error ? (
          <div role='alert' className='m-4 bg-red-100 text-red-800 rounded text-center p-4'>
            <p>{error}</p>
            <button type='button' onClick={() => setRetryCount((count) => count + 1)} className='mt-3 rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800'>
              Reintentar
            </button>
          </div>
        ) : titles.length === 0 ? (
          <NoResultComponent />
        ) : (
          <>
            <TitleCard titles={titles} />
            <Pagination activePage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )
      ) : (
        <div className='container mx-auto py-2 sm:py-3 px-3 sm:px-10'>
          <CarouselComponent searchType='all' title='Todas las tendencias' />
          <CarouselComponent searchType='movie' title='Películas en tendencia' className='mt-3 sm:mt-5' />
          <CarouselComponent searchType='tv' title='Series en tendencia' className='mt-3 sm:mt-5' />
        </div>
      )}
    </>
  )
}
