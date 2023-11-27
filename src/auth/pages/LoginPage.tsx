import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store/store'
import {
  startGoogleLogin,
  startLoginWithEmail,
  startResetErrorMsg,
} from '../../store/auth/thunks'
import { useEffect, useMemo } from 'react'
import Swal from 'sweetalert2'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

export const LoginPage = () => {
  const dispatch = useDispatch()

  const { status, errorMessage } = useSelector((state: RootState) => state.auth)

  const isChequeandoAutenticacion = useMemo(
    () => status === 'chequeando',
    [status]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(startLoginWithEmail(data))
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
  }, [errorMessage, dispatch])

  return (
    <>
      <div className='bg-slate-700 relative flex flex-col justify-center min-h-screen overflow-hidden'>
        <div className='bg-stone-100 w-full p-6 m-auto rounded-md shadow-xl lg:max-w-xl'>
          <h1 className='text-3xl font-semibold text-center text-purple-700 uppercase'>
            Iniciar Sesion
          </h1>
          <form action='' className='mt-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-2'>
              <label
                htmlFor='email'
                className='block text-sm font-semibold text-gray-800'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                placeholder='Email'
                {...register('email', {
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ingrese un email válido',
                  },
                })}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
              {errors.email && (
                <span className='text-red-700'>{errors.email.message}</span>
              )}
            </div>
            <div className='mb-2'>
              <label
                htmlFor='password'
                className='block text-sm font-semibold text-gray-800'
              >
                Contraseña
              </label>
              <input
                type='password'
                id='password'
                placeholder='Contraseña'
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'La contaseña debe tener al menos 6 caracteres',
                  },
                })}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
              {errors.password && (
                <span className='text-red-700'>{errors.password.message}</span>
              )}{' '}
            </div>

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
