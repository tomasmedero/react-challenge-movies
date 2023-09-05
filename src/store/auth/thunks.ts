import { AnyAction } from 'redux'
import { checkingCredentials, login, logout } from '.'
import {
  registerWithEmail,
  loginWithEmail,
  logoutFirebase,
} from '../../firebase/providers'

export const checkingAuth = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials())
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
  return async (dispatch: any) => {
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
}) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials())
    const res = await loginWithEmail({ email, password })

    if (!res.ok) return dispatch(logout(res))

    dispatch(login(res))
  }
}

export const startLogout = () => {
  return async (dispatch: any) => {
    await logoutFirebase()

    dispatch(logout({}))
  }
}
