import { useState, useEffect } from 'react'
import { getAPISearch } from '../helpers'
import { TitleInfo } from '../types/types';
import { CarouselComponent, NoResultComponent, TitleCard } from '../components'
import { LoadingPage } from '../auth/pages'
import { useNavigate, useParams } from 'react-router-dom'


export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [titles, setTitles] = useState<TitleInfo[]>([])
  
  const navigate = useNavigate()
  const { searchQuery: paramSearchQuery } = useParams()
  
  useEffect(() => {
    if (paramSearchQuery) {
      fetchResults(paramSearchQuery)
    }
  }, [paramSearchQuery])
  
  const fetchResults = async (query: string) => {
    setIsLoading(true)
    setTitles([])
    try {
      const result = await getAPISearch({ searchQuery: query })
      setTitles(result)
      setSearchQuery('')
    } catch (error) {
      console.error('Error fetching:', error)
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`)
      setSearchQuery('')
    }
  }


  return (
    <>
      <form className='m-3' onSubmit={handleSubmit}>
        <label
          htmlFor='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Buscar
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block ml-2 w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder={`Buscar Peliculas y Series...`}
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete='off'
          />
          <button
            type='submit'
            className='text-white mb-2 absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Buscar
          </button>
        </div>
      </form>


      {
        paramSearchQuery ? (
          isLoading ? (
            <LoadingPage />
          ) : (
            titles.length === 0 ? (
              <NoResultComponent />
            ) : (
              <TitleCard titles={titles} />
            )
          )
        ) : (
          <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10">
            <CarouselComponent searchType='all' title='Todas las Tendencias' />
            <CarouselComponent searchType='movie' title='Peliculas en Tendencia' className='mt-5' />
            <CarouselComponent searchType='tv' title='Series en Tendencia' className='mt-5' />
          </div>
        )
      }
    </>
  )
}
