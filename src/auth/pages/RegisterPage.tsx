import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { RootState } from '../../store/store'

import {
  startEmailRegister,
  startGoogleLogin,
  startTwitterLogin,
} from '../../store/auth/thunks'
import Swal from 'sweetalert2'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
  displayName: string
}

export const RegisterPage = () => {
  const dispatch = useDispatch()

  const { errorMessage } = useSelector((state: RootState) => state.auth)

  //TODO
  // const isChequeandoAutenticacion = useMemo(
  //   () => status === 'chequeando',
  //   [status]
  // )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    dispatch(startEmailRegister(data))

  const onGoogleLogin = () => {
    const thunkAction = startGoogleLogin()
    thunkAction(dispatch)
  }

  const onTwitterSignIn = () => {
    const thunkAction = startTwitterLogin()
    thunkAction(dispatch)
  }

  useEffect(() => {
    if (errorMessage !== undefined && errorMessage !== null) {
      Swal.fire('Error en la autenticacion', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <>
      <div className='bg-slate-700 relative flex flex-col justify-center min-h-screen overflow-hidden'>
        <div className='bg-stone-100 w-full p-6 m-auto rounded-md shadow-xl lg:max-w-xl'>
          <h1 className='text-3xl font-semibold text-center text-purple-700 uppercase'>
            Crear Cuenta
          </h1>
          <form action='' className='mt-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-2'>
              <label
                htmlFor='displayName'
                className='block text-sm font-semibold text-gray-800'
              >
                Nombre
              </label>
              <input
                type='text'
                id='displayName'
                placeholder='Nombre'
                {...register('displayName', { required: true })}
                className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
              {errors.displayName && <span>This field is required</span>}
            </div>
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
                {...register('email', { required: true })}
                className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
              {errors.email && <span>This field is required</span>}
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
                {...register('password', { required: true })}
                className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
              {errors.password && <span>This field is required</span>}
            </div>

            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'
              >
                Registrar
              </button>
            </div>
          </form>

          {/* Barra separadora de redes sociales */}
          <div className='relative flex items-center justify-center w-full mt-6 border border-t'>
            <div className='absolute px-5 bg-white'>Ingresa con</div>
          </div>

          {/* Login con redes sociales */}
          <div className='flex mt-4 gap-x-2'>
            <button
              onClick={onGoogleLogin}
              type='button'
              className='flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                className='w-5 h-5 fill-current'
              >
                <path d='M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z'></path>
              </svg>
            </button>

            <button
              onClick={onTwitterSignIn}
              type='button'
              className='flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                className='w-5 h-5 fill-current'
              >
                <path d='M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z'></path>
              </svg>
            </button>
          </div>

          <p className='mt-8 text-xs font-light text-center text-gray-700'>
            {' '}
            Ya tienes una cuenta?{' '}
            <Link
              to='/auth/login'
              className='font-medium text-purple-600 hover:underline'
            >
              Inicia Sesion
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
