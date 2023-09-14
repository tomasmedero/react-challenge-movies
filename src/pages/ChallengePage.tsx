import { NavLink } from 'react-router-dom'
export const ChallengePage = () => {
  return (
    <>
      <div className='flex justify-left mt-5 ml-3'>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
          <NavLink to='/series'>
            <img className='rounded-t-lg mx-auto' src='/seriesPH.jpg' alt='' />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
              Popular Series
            </h6>
          </div>
        </div>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-3'>
          <NavLink to='/movies'>
            <img className='rounded-t-lg mx-auto' src='/moviesPH.jpg' alt='' />
          </NavLink>
          <div className='p-5'>
            <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
              Popular Movies
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}

//TODO
// Crear un componente donde cuando toques el movie o serie te traiga la info
//Agregar un buscador
// En el componente de la movie o serie que tenga una parte de comentarios y solo te deje comentar si esta logueado
