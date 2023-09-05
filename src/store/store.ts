import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
})

//TODO
//Crear una store para series y pelis ver que onda que trae la API
export type RootState = ReturnType<typeof store.getState>
