import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store/store'
import {
  startGoogleLogin,
  startLoginWithEmail,
  startResetErrorMsg,
} from '../../store/auth/thunks'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { FormInterfaceProps } from '../types/types'
import { FormInput } from '../components/FormInput'

type Inputs = {
  email: string
  password: string
}

export const Login2Page = () => {
  const dispatch = useDispatch()

  const [values, setValues] = useState<Inputs>({
    email: '',
    password: '',
  })

  const inputs: FormInterfaceProps[] = [
    {
      id: 'email',
      name: 'email',
      placeholder: 'Email',
      type: 'email',
      label: 'Email',
      errorForm: 'Debe ser un email valido',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      placeholder: 'Contraseña',
      type: 'password',
      label: 'Contraseña',
      errorForm: 'La contraseña debe ser de 5 a 12 caracteres',
      required: true,
      pattern: '^[A-Za-z0-9]{5,12}$',
    },
  ]

  const { status, errorMessage } = useSelector((state: RootState) => state.auth)

  const isChequeandoAutenticacion = useMemo(
    () => status === 'chequeando',
    [status]
  )

  const handleSubmit = (e: any) => {
    e.preventDefault()

    dispatch(startLoginWithEmail(values))
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onGoogleLogin = () => {
    const thunkAction = startGoogleLogin()
    thunkAction(dispatch)
  }

  useEffect(() => {
    if (errorMessage !== undefined && errorMessage !== null) {
      Swal.fire('Error en la autenticacion', errorMessage, 'error')
      const thunkAction = startResetErrorMsg()
      thunkAction(dispatch)
    }
  }, [errorMessage])
  return (
    <>
      <div className='bg-slate-700 relative flex flex-col justify-center min-h-screen overflow-hidden'>
        <div className='bg-stone-100 w-full p-6 m-auto rounded-md shadow-xl lg:max-w-xl'>
          <h1 className='text-3xl font-semibold text-center text-purple-700 uppercase'>
            Iniciar Sesion 2
          </h1>
          <form action='' className='mt-6' onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput key={input.id} {...input} onChange={onChange} />
            ))}
            <div className='mt-6'>
              <button
                disabled={isChequeandoAutenticacion}
                type='submit'
                className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'
              >
                Login
              </button>
            </div>
          </form>

          {/* Barra separadora de redes sociales */}
          <div className='relative flex items-center justify-center w-full mt-6 border border-t'>
            <div className='absolute px-5 bg-white bg-opacity-50'>O</div>
          </div>

          {/* Login con redes sociales */}

          <div className='flex mt-4 gap-x-2'>
            <button
              disabled={isChequeandoAutenticacion}
              onClick={onGoogleLogin}
              className='w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline'
              type='button'
            >
              Ingresa con Google
            </button>
          </div>

          <p className='mt-8 text-xs font-light text-center text-gray-700'>
            {' '}
            No tienes una cuenta?{' '}
            <Link
              to='/auth/register'
              className='font-medium text-purple-600 hover:underline'
            >
              Registrate{' '}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
