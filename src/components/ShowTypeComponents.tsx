import { NavLink } from 'react-router-dom'
import { InfoBarProps } from '../types/types'

export const ShowTypeComponent: React.FC<InfoBarProps> = ({ pageInfo }) => {
  let titleTypeInfo: string = ''
  const path = location.pathname

  if (path.startsWith('/movie')) {
    titleTypeInfo = 'movie'
  } else if (path.startsWith('/tv')) {
    titleTypeInfo = 'tv'
  }

  return (
    <>
      <div className='flex justify-left mt-5 ml-3'>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
          <NavLink to={`/${titleTypeInfo}/top20`}>
            <img
              className='rounded-t-lg mt-3 mx-auto'
              src={`/${titleTypeInfo}PHTop.jpg`}
              alt=''
            />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
              Top 20 {pageInfo}
            </h6>
          </div>
        </div>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-3'>
          <NavLink to='/'>
            <img
              className='rounded-t-lg mt-3 mx-auto'
              src='/otros.jpg'
              alt=''
            />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
              En construccion
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}