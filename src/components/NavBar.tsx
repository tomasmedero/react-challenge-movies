import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { startLogout } from '../store/auth/thunks'
import { useEffect, useRef, useState } from 'react'
import { RootState } from '../store/store'
import { NavOptions } from '.'
import { CountrySelector } from './CountrySelector'

export const Navbar = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false)
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, photoURL } = useSelector((state: RootState) => state.auth)

  const toggleDropdownProfile = () => {
    setIsOpenProfile(!isOpenProfile)
  }
  
  const closeDropdownProfile = () => {
    setIsOpenProfile(false)
  }

  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch)
  }

  const closeSearch = () => {
    setIsOpenSearch(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`)
      setSearchQuery('')
      closeSearch()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Cerrar dropdown de perfil si se hace clic fuera
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdownProfile()
      }
      
      // Cerrar búsqueda si se hace clic fuera
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeSearch()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const onLogout = () => {
    dispatch(startLogout())
  }

  return (
    <nav className='border-gray-200 bg-gray-300 dark:bg-gray-800 dark:border-gray-700'>
      <div className='max-w-screen-xl flex items-center justify-between mx-auto p-4'>
        {/* Logo */}
        <Link
          className='flex items-center text-2xl font-extrabold dark:text-white'
          to='/'
        >
          STREAMING
        </Link>

        {/* Sección central con menú de navegación */}
        <div className='flex items-center space-x-4'>
          <ul className='flex items-center space-x-6'>
            <NavOptions optionlink='tv' title='Series' />
            <NavOptions optionlink='movie' title='Peliculas' />
            <NavOptions optionlink='tendency' title='Tendencias' />
            {status === 'autenticado' && <NavOptions optionlink='favorites' title='Favoritos' />}
          </ul>
        </div>

        {/* Sección derecha con búsqueda, selector de país y perfil */}
        <div className="flex items-center space-x-4">
          {/* Búsqueda */}
          <div className="relative flex items-center" ref={searchRef}>
            {isOpenSearch ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="search"
                  className="w-40 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                  autoFocus
                />
                <button
                  type="submit"
                  className="ml-1 text-blue-600 hover:text-blue-700"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
                <button 
                  type="button" 
                  className="ml-1 text-gray-600 hover:text-gray-900"
                  onClick={closeSearch}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
              </form>
            ) : (
              <button 
                onClick={toggleSearch} 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Selector de País */}
          <CountrySelector />

          {/* Perfil de Usuario */}
          {status === 'autenticado' ? (
            <div className='relative inline-block text-left' ref={dropdownRef}>
              <button
                onClick={toggleDropdownProfile}
                className='flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300'
              >
                <img
                  className='w-8 h-8 rounded-full'
                  src={photoURL || '/default-avatar.png'}
                  alt='Avatar'
                />
              </button>

              {isOpenProfile && (
                <div className='origin-top-right absolute right-0 mt-3 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50'>
                  <div
                    className='py-1'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='options-menu'
                  >
                    <a
                      onClick={onLogout}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer'
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
              <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                Ingresar
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
