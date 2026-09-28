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
    <div className='relative mt-3' ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`País seleccionado: ${selectedCountry.name}`}
        onClick={() => setIsOpen((open) => !open)}
        className='flex items-center space-x-1 sm:space-x-2 border border-gray-300 rounded-full text-gray-600 h-8 sm:h-10 px-2 sm:px-4 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <img src={selectedCountry.flagImage} alt='' className='h-4 sm:h-5 w-auto mr-1 sm:mr-2' />
        <span className='text-xs sm:text-sm hidden sm:block'>{selectedCountry.name}</span>
        <svg className='fill-current h-3 w-3 sm:h-4 sm:w-4 ml-1' aria-hidden='true' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>

      {isOpen && (
        <ul id={listboxId} role='listbox' aria-label='Seleccionar país' className='absolute z-10 mt-1 w-36 sm:w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto py-1'>
          {AVAILABLE_COUNTRIES.map((country) => (
            <li key={country.abbreviation} role='option' aria-selected={selectedCountry.name === country.name}>
              <button
                type='button'
                onClick={() => handleCountrySelect(country.name)}
                className={`flex w-full items-center px-2 sm:px-4 py-2 text-xs sm:text-sm text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${selectedCountry.name === country.name ? 'bg-gray-50 font-semibold' : ''}`}
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
