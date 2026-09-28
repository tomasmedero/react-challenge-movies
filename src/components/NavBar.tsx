import { FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { startLogout } from '../store/auth/thunks'
import { RootState } from '../store/store'
import { NavOptions } from './NavOptions'
import { CountrySelector } from './CountrySelector'

export const Navbar = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false)
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, photoURL } = useSelector((state: RootState) => state.auth)

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    const query = searchQuery.trim().replace(/\s+/g, ' ')
    if (query.length < 2) return

    navigate(`/search/${encodeURIComponent(query)}`)
    setSearchQuery('')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpenProfile(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsOpenMobileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className='sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-lg shadow-black/10 backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8'>
        <Link className='flex flex-none items-center gap-2 font-black tracking-tight' to='/'>
          <span className='grid h-9 w-9 place-items-center rounded-xl bg-cyan-500 text-lg text-slate-950'>S</span>
          <span className='hidden text-lg sm:block'>STREAMING</span>
        </Link>

        <ul className='hidden items-center gap-5 md:flex'>
          <NavOptions optionlink='tv' title='Series' />
          <NavOptions optionlink='movie' title='Películas' />
          <NavOptions optionlink='tendency/movie' title='Tendencias' />
          {status === 'autenticado' && <NavOptions optionlink='favorites' title='Favoritos' />}
        </ul>

        <form onSubmit={handleSearch} role='search' className='ml-auto hidden min-w-0 max-w-xs flex-1 lg:block'>
          <label htmlFor='nav-search' className='sr-only'>Buscar películas y series</label>
          <div className='relative'>
            <svg className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' aria-hidden='true' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z' />
            </svg>
            <input id='nav-search' type='search' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder='Buscar...' autoComplete='off' className='w-full rounded-xl border border-white/10 bg-white/10 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/20' />
          </div>
        </form>

        <div className='ml-auto flex items-center gap-2 lg:ml-0'>
          <button type='button' onClick={() => navigate('/')} aria-label='Ir a buscar' className='rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden'>
            <svg className='h-5 w-5' aria-hidden='true' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z' />
            </svg>
          </button>

          <CountrySelector />

          {status === 'autenticado' ? (
            <div className='relative' ref={dropdownRef}>
              <button type='button' onClick={() => setIsOpenProfile((open) => !open)} aria-expanded={isOpenProfile} aria-label='Menú de perfil' className='rounded-full ring-2 ring-transparent transition hover:ring-cyan-400 focus:outline-none focus:ring-cyan-400'>
                <img className='h-9 w-9 rounded-full object-cover' src={photoURL || '/default-avatar.png'} alt='' />
              </button>
              {isOpenProfile && (
                <div className='absolute right-0 mt-3 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl'>
                  <button type='button' onClick={() => dispatch(startLogout())} className='w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100'>Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            <Link to='/auth/login' className='rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-400 sm:px-4 sm:text-sm'>Ingresar</Link>
          )}

          <div className='relative md:hidden' ref={mobileMenuRef}>
            <button type='button' onClick={() => setIsOpenMobileMenu((open) => !open)} aria-expanded={isOpenMobileMenu} aria-label='Abrir menú' className='rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white'>
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={isOpenMobileMenu ? 'M6 18 18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
            {isOpenMobileMenu && (
              <ul className='absolute right-0 mt-3 w-52 space-y-1 rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-xl' onClick={() => setIsOpenMobileMenu(false)}>
                <NavOptions optionlink='tv' title='Series' />
                <NavOptions optionlink='movie' title='Películas' />
                <NavOptions optionlink='tendency/movie' title='Tendencias' />
                {status === 'autenticado' && <NavOptions optionlink='favorites' title='Favoritos' />}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
