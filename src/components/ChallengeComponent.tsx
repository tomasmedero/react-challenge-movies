import { NavLink } from 'react-router-dom'

export const ChallengeComponent = () => {
  return (
    <div className='flex flex-wrap justify-left mt-5 ml-3'>
      <div className='w-1/4 p-3'>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
          <NavLink to='/tv'>
            <img className='rounded-t-lg mt-3 mx-auto' src='/tvPH.jpg' alt='' />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center'>
              Series
            </h6>
          </div>
        </div>
      </div>
      <div className='w-1/4 p-3'>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <NavLink to='/movie'>
            <img
              className='rounded-t-lg mt-3 mx-auto'
              src='/moviePH.jpg'
              alt=''
            />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center'>
              Peliculas
            </h6>
          </div>
        </div>
      </div>
      <div className='w-1/4 p-3'>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <NavLink to='/trending'>
            <img
              className='rounded-t-lg mt-3 mx-auto'
              src='/tendency.jpg'
              alt=''
            />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center'>
              Tendencia
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}
