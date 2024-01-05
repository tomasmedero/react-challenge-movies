import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { countrySlice } from './country/countrySlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    country: countrySlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
