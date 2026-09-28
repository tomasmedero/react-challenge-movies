import { KeyboardEvent, useEffect, useId, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AVAILABLE_COUNTRIES } from '../constants/countries'
import { setCountry } from '../store/country/countrySlice'
import { RootState } from '../store/store'

export const CountrySelector = () => {
  const dispatch = useDispatch()
  const { name } = useSelector((state: RootState) => state.country)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const selectedCountry =
    AVAILABLE_COUNTRIES.find((country) => country.name === name) ||
    AVAILABLE_COUNTRIES[0]

  const handleCountrySelect = (countryName: string) => {
    dispatch(setCountry({ name: countryName }))
    localStorage.setItem('countryName', countryName)
    setIsOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      dropdownRef.current?.querySelector<HTMLButtonElement>('[aria-haspopup]')?.focus()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative' ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`País seleccionado: ${selectedCountry.name}`}
        onClick={() => setIsOpen((open) => !open)}
        className='flex h-9 items-center rounded-xl border border-white/10 bg-white/10 px-2 text-slate-200 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:px-3'
      >
        <img src={selectedCountry.flagImage} alt='' className='h-4 sm:h-5 w-auto mr-1 sm:mr-2' />
        <span className='hidden text-xs sm:block'>{selectedCountry.name}</span>
        <svg className='fill-current h-3 w-3 sm:h-4 sm:w-4 ml-1' aria-hidden='true' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>

      {isOpen && (
        <ul id={listboxId} role='listbox' aria-label='Seleccionar país' className='absolute right-0 z-10 mt-2 w-40 max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white py-1 text-slate-800 shadow-xl'>
          {AVAILABLE_COUNTRIES.map((country) => (
            <li key={country.abbreviation} role='option' aria-selected={selectedCountry.name === country.name}>
              <button
                type='button'
                onClick={() => handleCountrySelect(country.name)}
                className={`flex w-full items-center px-3 py-2.5 text-left text-sm text-slate-800 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none ${selectedCountry.name === country.name ? 'bg-cyan-50 font-semibold text-cyan-800' : ''}`}
              >
                <img src={country.flagImage} alt='' className='h-4 sm:h-5 w-auto mr-1 sm:mr-2' />
                <span className='truncate'>{country.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
