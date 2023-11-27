/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, Dispatch } from 'redux'
import { checkingCredentials, login, logout, resetErrorMsg } from '.'
import {
  registerWithEmail,
  loginWithEmail,
  logoutFirebase,
  loginWithGoogle,
} from '../../firebase/providers'

export const checkingAuth = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startResetErrorMsg = () => {
  return async (dispatch: Dispatch) => {
    dispatch(resetErrorMsg())
  }
}

export const startGoogleLogin = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())

    const res = await loginWithGoogle()

    if (res === undefined) {
      return {} as AnyAction
    }

    if (!res.ok) {
      dispatch(logout({ errorMessage: res.errorMessage }))
      return {} as AnyAction // Devuelve una acción vacía como fallback
    }

    dispatch(login(res))
  }
}

export const startEmailRegister = ({
  email,
  password,
  displayName,
}: {
  email: string
  password: string
  displayName: string
}): any => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())

    const { ok, uid, photoURL, errorMessage } = await registerWithEmail({
      email,
      password,
      displayName,
    })

    if (!ok) {
      dispatch(logout({ errorMessage }))
      return {} as AnyAction // Devuelve una acción vacía como fallback
    }

    dispatch(login({ uid, displayName, email, photoURL }))

    return {} as AnyAction // Devuelve una acción vacía como fallback
  }
}

export const startLoginWithEmail = ({
  email,
  password,
}: {
  email: string
  password: string
}): any => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())
    const res = await loginWithEmail({ email, password })

    if (!res.ok) return dispatch(logout(res))

    dispatch(login(res))

    return {} as AnyAction // Devuelve una acción vacía como fallback
  }
}

export const startLogout: any = () => {
  return async (dispatch: Dispatch) => {
    await logoutFirebase()

    dispatch(logout({}))
  }
}
