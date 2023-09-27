import { useParams } from 'react-router-dom'
import { getTitleById } from '../helpers'
import { useEffect, useState } from 'react'
import { TitleInfo } from '../types/types'

export const IdPage = () => {
  const [title, setTitle] = useState<TitleInfo | null>(null)
  let { id } = useParams()

  useEffect(() => {
    async function fetchTitle() {
      try {
        let titleTypeInfo: string = ''
        const path = location.pathname

        if (path.startsWith('/movie/')) {
          titleTypeInfo = 'movie'
        } else if (path.startsWith('/tv/')) {
          titleTypeInfo = 'tv'
        }

        // Convierte id en un número utilizando parseInt
        const numericId = id ? parseInt(id, 10) : 1

        let data = await getTitleById(numericId, titleTypeInfo)

        setTitle(data)
      } catch (error) {
        console.error('Error fetching the data fix please:', error)
      }
    }

    fetchTitle()
  }, [])

  return (
    <>
      <div className='min-h-screen grid place-items-center font-mono'>
        <div className='rounded-md bg-white shadow-lg border-gray-100 rounded-3xl space-x-2 shadow-lg'>
          <div className='md:flex px-4 leading-none max-w-4xl'>
            <div className='flex-none '>
              <img
                src={`https://image.tmdb.org/t/p/w500${title?.posterUrl}`}
                alt='pic'
                className='h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg'
              />
            </div>

            <div className='flex-col text-gray-300'>
              <p className='pt-4 text-2xl font-bold text-center'>
                {title?.name}({title?.releaseDay})
              </p>
              <hr className='hr-text' data-content='' />
              <div className='text-md flex justify-between px-4 my-2'>
                <span className='font-bold'>
                  2h 2min | Crime, Drama, Thriller
                </span>
                <span className='font-bold'></span>
              </div>
              <p className='hidden md:block px-4 my-4 text-sm text-left'>
                {title?.description}
              </p>

              <p className='flex text-md px-4 my-2'>
                Rating: {title?.rating}/10
              </p>

              <div className='text-xs'>
                <button
                  type='button'
                  className='border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline'
                >
                  TRAILER
                </button>

                <button
                  type='button'
                  className='border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline'
                >
                  IMDB
                </button>

                <button
                  type='button'
                  className='border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline'
                >
                  AMAZON
                </button>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center px-4 mb-4 w-full'>
            <div className='flex'>
              <h1>Favorite</h1>
              <h2>Ver</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
