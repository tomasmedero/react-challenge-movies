import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setCountry } from '../store/country/countrySlice'
import { RootState } from '../store/store'
import { Country } from '../types/types'
import { AVAILABLE_COUNTRIES } from '../constants/countries'
import { useState, useRef, useEffect } from 'react'

export const CountrySelector = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isCardRoute = location.pathname.startsWith('/card/')
  const { name } = useSelector((state: RootState) => state.country)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Encontrar el país seleccionado actual
  const selectedCountry = AVAILABLE_COUNTRIES.find(country => country.name === name) || AVAILABLE_COUNTRIES[0]

  const handleCountrySelect = (countryName: string) => {
    const selectedCountry: Country = { name: countryName }
    
    dispatch(setCountry(selectedCountry))
    localStorage.setItem('countryName', countryName)
    setIsOpen(false)

    // Si estamos en una ruta de card, recargamos para actualizar datos
    if (isCardRoute) {
      window.location.reload()
    }
  }

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative mt-3" ref={dropdownRef}>
      {/* Botón selector personalizado */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-gray-300 rounded-full text-gray-600 h-10 px-4 bg-white hover:border-gray-400 focus:outline-none"
      >
        <img 
          src={selectedCountry.flagImage} 
          alt={`Bandera de ${selectedCountry.name}`} 
          className="h-5 w-auto mr-2"
        />
        <span>{selectedCountry.name}</span>
        <svg className="fill-current h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </button>
      
      {/* Dropdown personalizado */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {AVAILABLE_COUNTRIES.map(({ name, abbreviation, flagImage }) => (
              <li 
                key={abbreviation}
                onClick={() => handleCountrySelect(name)}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  selectedCountry.name === name ? 'bg-gray-50' : ''
                }`}
              >
                <img 
                  src={flagImage} 
                  alt={`Bandera de ${name}`} 
                  className="h-5 w-auto mr-2" 
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 