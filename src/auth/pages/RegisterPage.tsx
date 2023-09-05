import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { RootState } from '../../store/store'
import { useForm } from '../../hooks/useForm'
import { startEmailRegister } from '../../store/auth/thunks'

export const RegisterPage = () => {
  const dispatch = useDispatch()

  const [formSubmiteado, setFormSubmiteado] = useState<boolean>(false)

  const { status, errorMessage } = useSelector((state: RootState) => state.auth)

  const isChequeandoAutenticacion = useMemo(
    () => status === 'chequeando',
    [status]
  )

  const { displayName, email, password, formData, onChange } = useForm({
    email: '',
    password: '',
    displayName: '',
  })

  const onSubmit = (event: any) => {
    event.preventDefault()

    setFormSubmiteado(true)

    dispatch(startEmailRegister(formData))
  }

  return (
    <>
      <div className='main-body'>
        <div className='circle'></div>
        <div className='card'>
          <div className='logo'>
            <i className='bx bx-bitcoin'></i>
          </div>
          <h2>Crear Cuenta</h2>

          <form action='' className='form' onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Nombre'
              name='displayName'
              value={displayName}
              onChange={onChange}
            />
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
            <button type='submit'> Registrar</button>
          </form>
          <footer>
            Ya estas registrado <Link to='/auth/login'>Logeate</Link>
          </footer>
        </div>
      </div>
    </>
  )
}
