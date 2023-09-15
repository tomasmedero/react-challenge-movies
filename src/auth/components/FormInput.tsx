import { useState } from 'react'
import { FormInterfaceProps } from '../types/types'
import './formInput.css'

export const FormInput: React.FC<FormInterfaceProps> = ({
  label,
  errorForm,
  onChange,
  id,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div className='mb-2'>
      <label htmlFor={id} className='block text-sm font-semibold text-gray-800'>
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
          isFocused && 'focused'
        }`}
      />
      <span>{errorForm}</span>
    </div>
  )
}
