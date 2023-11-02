import { NavLink } from 'react-router-dom'

export const ShowTypeComponent = () => {
  let titleTypeInfo: string = ''
  let pageInfo: string = ''
  const path = location.pathname

  if (path.startsWith('/movie')) {
    titleTypeInfo = 'movie'
    pageInfo = 'Peliculas'
  } else if (path.startsWith('/tv')) {
    titleTypeInfo = 'tv'
    pageInfo = 'Series'
  }

  return (
    <>
      <div className='  grid sm:grid-cols-2 md:grid-cols-4 gap-2 m-5 '>
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
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
          <NavLink to={`/${titleTypeInfo}/search`}>
            <img
              className='rounded-t-lg mt-3 mx-auto'
              src={`/${titleTypeInfo}PHSearch.jpg`}
              alt=''
            />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
              Buscar {pageInfo}
            </h6>
          </div>
        </div>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
          <NavLink to='/'>
            <img
              className='rounded-t-lg mt-3 mx-auto'
              src='/otros.jpg'
              alt=''
            />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
              En Construccion
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}
