import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { countrySlice } from './country/countrySlice'
import { titleSlice } from './titles/titleSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    country: countrySlice.reducer,
    title: titleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
})

export type RootState = ReturnType<typeof store.getState>
