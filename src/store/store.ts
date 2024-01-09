import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { countrySlice } from './country/countrySlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    country: countrySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
})

export type RootState = ReturnType<typeof store.getState>
