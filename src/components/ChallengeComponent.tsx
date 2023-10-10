import { NavLink } from 'react-router-dom'

export const ChallengeComponent = () => {
  return (
    <>
      <div className='flex justify-left mt-5 ml-3'>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
          <NavLink to='/tv'>
            <img className='rounded-t-lg mt-3 mx-auto' src='/tvPH.jpg' alt='' />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
              Informacion Series
            </h6>
          </div>
        </div>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-3'>
          <NavLink to='/movie'>
            <img
              className='rounded-t-lg mt-3 mx-auto'
              src='/moviePH.jpg'
              alt=''
            />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
              Informacion Peliculas
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}
