import { useEffect, useState } from 'react'
import { getData } from '../helpers/getData'
import { TitleInfo } from '../types/types'
export const MoviesPage = () => {
  const [movies, setMovies] = useState<TitleInfo[]>([])
  const datype = 'movie'

  useEffect(() => {
    function fetchMovie() {
      try {
        const dataMovie = getData(datype)
        dataMovie.sort((a, b) => a.title.localeCompare(b.title))
        const limitedDataMovie = dataMovie.slice(0, 21)
        setMovies(limitedDataMovie)
      } catch (error) {
        console.error('Error fetching movie name:', error)
      }
    }

    fetchMovie()
  }, [])

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-6 gap-4 mt-5 ml-5 mb-5'>
        {movies.map((movie) => (
          <div className='flex justify-left mt-5 ml-3 w-40' key={movie.id}>
            <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
              <img className='rounded-t-lg mx-auto' src={movie.url} alt='' />

              <div className='p-5'>
                <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
                  {movie.title}
                </h6>
                <small>{movie.releaseYear}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
