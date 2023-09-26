import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getTitleById } from '../helpers'

export const IdPage = () => {
  const { id } = useParams()

  //const title = useMemo(() => getTitleById(id), [id])

  return (
    <>
      <div className='min-h-screen grid place-items-center font-mono'>
        <div className='rounded-md bg-white shadow-lg border-gray-100 rounded-3xl space-x-2 shadow-lg'>
          <div className='md:flex px-4 leading-none max-w-4xl'>
            <div className='flex-none '>
              <img
                src='https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500'
                alt='pic'
                className='h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg'
              />
            </div>

            <div className='flex-col text-gray-300'>
              <p className='pt-4 text-2xl font-bold text-center'>
                Joker (2020)
              </p>
              <hr className='hr-text' data-content='' />
              <div className='text-md flex justify-between px-4 my-2'>
                <span className='font-bold'>
                  2h 2min | Crime, Drama, Thriller
                </span>
                <span className='font-bold'></span>
              </div>
              <p className='hidden md:block px-4 my-4 text-sm text-left'>
                In Gotham City, mentally troubled comedian Arthur Fleck is
                disregarded and mistreated by society. He then embarks on a
                downward spiral of revolution and bloody crime. This path brings
                him face-to-face with his alter-ego: the Joker.{' '}
              </p>

              <p className='flex text-md px-4 my-2'>Rating: 9.0/10</p>

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
