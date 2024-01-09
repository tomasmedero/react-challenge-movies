import { createSlice } from '@reduxjs/toolkit'
import { Country } from '../../types/types'

const initialState: Country = {
  name: localStorage.getItem('countryName') || 'Argentina',
}

export const countrySlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCountry: (state, { payload }) => {
      state.name = payload.name
    },
  },
})

export const { setCountry } = countrySlice.actions
