import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../types/types'

const initialState: User = {
  status: 'chequeando',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'autenticado'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      state.errorMessage = null
    },

    logout: (state, { payload }) => {
      state.status = 'no-autenticado'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload?.errorMessage
    },

    checkingCredentials: (state) => {
      state.status = 'chequeando'
    },

    resetErrorMsg: (state) => {
      state.errorMessage = null
    },
  },
})

export const { login, logout, checkingCredentials, resetErrorMsg } =
  authSlice.actions
