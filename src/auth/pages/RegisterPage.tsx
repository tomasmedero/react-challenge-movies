import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { RootState } from '../../store/store'
import { startEmailRegister, startGoogleLogin } from '../../store/auth/thunks'
import Swal from 'sweetalert2'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
  displayName: string
}

export const RegisterPage = () => {
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

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    dispatch(startEmailRegister(data))

  const onGoogleLogin = () => {
    const thunkAction = startGoogleLogin()
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
                {...register('displayName', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 5,
                    message: 'El nombre debe tener al menos 5 caracteres',
                  },
                })}
                className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
              {errors.displayName && (
                <span className='text-red-700'>
                  {errors.displayName.message}
                </span>
              )}
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
                {...register('email', {
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ingrese un email válido',
                  },
                })}
                className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
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
                className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
              {errors.password && (
                <span className='text-red-700'>{errors.password.message}</span>
              )}
            </div>

            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'
                disabled={isChequeandoAutenticacion}
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
              disabled={isChequeandoAutenticacion}
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
