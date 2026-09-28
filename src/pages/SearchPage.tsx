import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingPage } from '../auth/pages'
import {
  CarouselComponent,
  NoResultComponent,
  Pagination,
  TitleCard,
} from '../components'
import { getAPISearch, isRestrictedSearchQuery } from '../helpers/getAPISearch'
import { TitleInfo } from '../types/types'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: (event: FormEvent) => void
  compact?: boolean
}

const SearchBar = ({ value, onChange, onSubmit, compact }: SearchBarProps) => (
  <form onSubmit={onSubmit} className='w-full' role='search'>
    <label htmlFor='main-search' className='sr-only'>
      Buscar películas y series
    </label>
    <div className={`group relative mx-auto flex items-center rounded-2xl border border-white/15 bg-white shadow-2xl shadow-black/20 transition focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-400/15 ${compact ? 'max-w-3xl' : 'max-w-2xl'}`}>
      <svg className='ml-5 h-5 w-5 flex-none text-slate-400 transition group-focus-within:text-cyan-600' aria-hidden='true' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z' />
      </svg>
      <input
        id='main-search'
        type='search'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Buscar una película o serie...'
        autoComplete='off'
        className='min-w-0 flex-1 border-0 bg-transparent px-4 py-4 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:py-5 sm:text-lg'
      />
      <button
        type='submit'
        className='m-1.5 flex-none rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 sm:px-7 sm:py-3.5 sm:text-base'
      >
        Buscar
      </button>
    </div>
  </form>
)

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [titles, setTitles] = useState<TitleInfo[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [retryCount, setRetryCount] = useState(0)
  const navigate = useNavigate()
  const { searchQuery: paramSearchQuery } = useParams()

  const fetchResults = useCallback(
    async (query: string, requestedPage: number, signal: AbortSignal) => {
      if (isRestrictedSearchQuery(query)) {
        setTitles([])
        setNotice('Esa búsqueda está restringida. Probá con el título de una película o serie apta para todo público.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError('')
      setNotice('')

      try {
        const result = await getAPISearch({
          searchQuery: query,
          page: requestedPage,
          signal,
        })
        setTitles(result.results)
        setTotalPages(result.totalPages)
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return
        setTitles([])
        setError('No pudimos cargar los resultados. Revisá tu conexión e intentá nuevamente.')
      } finally {
        if (!signal.aborted) setIsLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    setSearchQuery(paramSearchQuery || '')
    setPage(1)
  }, [paramSearchQuery])

  useEffect(() => {
    if (!paramSearchQuery) return

    const controller = new AbortController()
    fetchResults(paramSearchQuery, page, controller.signal)
    return () => controller.abort()
  }, [fetchResults, page, paramSearchQuery, retryCount])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const query = searchQuery.trim().replace(/\s+/g, ' ')
    if (query.length < 2) {
      setNotice('Escribí al menos dos caracteres para buscar.')
      return
    }
    if (isRestrictedSearchQuery(query)) {
      setNotice('Esa búsqueda está restringida. Probá con el título de una película o serie apta para todo público.')
      return
    }

    setNotice('')
    setPage(1)
    navigate(`/search/${encodeURIComponent(query)}`)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!paramSearchQuery) {
    return (
      <main className='min-h-screen bg-slate-950 text-white'>
        <section className='relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20'>
          <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(8,145,178,0.32),_transparent_38%),radial-gradient(circle_at_80%_20%,_rgba(124,58,237,0.24),_transparent_34%),linear-gradient(to_bottom,_#0f172a,_#020617)]' />
          <div className='absolute left-1/2 top-8 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl sm:h-96 sm:w-96' />
          <div className='mx-auto max-w-4xl text-center'>
            <div>
              <SearchBar value={searchQuery} onChange={setSearchQuery} onSubmit={handleSubmit} />
            </div>
            {notice && <p role='alert' className='mx-auto mt-4 max-w-2xl rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200'>{notice}</p>}
          </div>
        </section>

        <section className='mx-auto max-w-7xl space-y-12 px-4 pb-20 sm:px-6 lg:px-8'>
          <CarouselComponent searchType='all' title='Tendencias de la semana' />
          <CarouselComponent searchType='movie' title='Películas que están dando que hablar' />
          <CarouselComponent searchType='tv' title='Series para maratonear' />
        </section>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-slate-100 pb-16'>
      <section className='bg-slate-900 px-4 py-10 sm:px-6 sm:py-14'>
        <div className='mx-auto max-w-7xl'>
          <p className='mb-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400'>Buscar en el catálogo</p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} onSubmit={handleSubmit} compact />
          {notice && <p role='alert' className='mx-auto mt-4 max-w-3xl rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-center text-sm text-amber-200'>{notice}</p>}
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-3 py-8 sm:px-6 lg:px-8'>
        {!notice && <h1 className='mb-5 text-2xl font-extrabold text-slate-900 sm:text-3xl'>Resultados para “{paramSearchQuery}”</h1>}
        {isLoading ? (
          <LoadingPage />
        ) : error ? (
          <div role='alert' className='rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800'>
            <p>{error}</p>
            <button type='button' onClick={() => setRetryCount((count) => count + 1)} className='mt-4 rounded-xl bg-red-700 px-5 py-2.5 font-semibold text-white transition hover:bg-red-800'>Reintentar</button>
          </div>
        ) : notice ? null : titles.length === 0 ? (
          <NoResultComponent />
        ) : (
          <>
            <TitleCard titles={titles} />
            <Pagination activePage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </section>
    </main>
  )
}
