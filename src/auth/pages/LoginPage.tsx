import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store/store'
import { useForm } from '../../hooks/useForm'
import { startLoginWithEmail } from '../../store/auth/thunks'
import { useMemo } from 'react'

export const LoginPage = () => {
  const dispatch = useDispatch()

  const { status, errorMessage } = useSelector((state: RootState) => state.auth)

  const isChequeandoAutenticacion = useMemo(
    () => status === 'chequeando',
    [status]
  )

  const { email, password, formData, onChange } = useForm({
    email: '',
    password: '',
  })

  const onSubmit = (event: any) => {
    event.preventDefault()

    dispatch(startLoginWithEmail(formData))
  }

  return (
    <>
      <div className='main-body'>
        <div className='circle'></div>
        <div className='card'>
          <div className='logo'>
            <i className='bx bx-bitcoin'></i>
          </div>
          <h2>Iniciar Sesion</h2>

          <form action='' className='form' onSubmit={onSubmit}>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
            />
            <button type='submit'> Ingresar</button>
          </form>
          <footer>
            No posees una cuenta? <Link to='/auth/register'>Registrate</Link>
          </footer>
        </div>
      </div>
    </>
  )
}
