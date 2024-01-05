import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { startLogout } from '../store/auth/thunks'
import { useEffect, useRef, useState } from 'react'
import { RootState } from '../store/store'

export const Navbar = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdownProfile = () => {
    setIsOpenProfile(!isOpenProfile)
  }
  const closeDropdownProfile = () => {
    setIsOpenProfile(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdownProfile()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const dispatch = useDispatch()

  const { status, photoURL } = useSelector((state: RootState) => state.auth)



  const onLogout = async () => {
    dispatch(startLogout())
  }

  const countries = ['Argentina', 'Brasil', 'Chile', 'Colombia', 'México', 'Perú'];


  return (
    <>
      <nav className='border-gray-200 bg-gray-300 dark:bg-gray-800 dark:border-gray-700'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link
            className='flex items-center text-2xl font-extrabold dark:text-white'
            to='/'
          >
            STREAMING
          </Link>

          <div className='w-full md:flex md:w-auto' id='navbar-default'>
            <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700'>
              <li>
                <NavLink
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  to='/tv'
                >
                  Series
                </NavLink>
              </li>

              <li>
                <NavLink
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  to='/movie'
                >
                  Peliculas
                </NavLink>
              </li>
              <li>
                <NavLink
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  to='/tendency'
                >
                  Tendencias
                </NavLink>
              </li>
              <li>
                <NavLink
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  to='/search'
                >
                  Buscar
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="relative inline-flex mt-3">
            <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {status === 'autenticado' ? (
            <div className='relative inline-block text-left mt-3' ref={dropdownRef}>
              <div>
                <button
                  onClick={toggleDropdownProfile}
                  className=' flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300'
                >
                  {photoURL ? (
                    <img
                      className='w-8 h-8 rounded-full'
                      src={photoURL}
                      alt='Avatar'
                    />
                  ) : (
                    <img
                      className='w-8 h-8 rounded-full'
                      src='/default-avatar.png'
                      alt='Avatar'
                    />
                  )}
                </button>
              </div>




              {isOpenProfile && (
                <div className='origin-top-right absolute right-0 mt-3 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                  <div
                    className='py-1'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='options-menu'
                  >
                    <a
                      onClick={onLogout}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      role='menuitem'
                    >
                      Salir
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to='/auth/login'>
              <button className='mt-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                Ingresar
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}
