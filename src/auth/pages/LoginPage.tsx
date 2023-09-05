import { Link } from 'react-router-dom'

export const LoginPage = () => {
  return (
    <>
      <div className='main-body'>
        <div className='circle'></div>
        <div className='card'>
          <div className='logo'>
            <i className='bx bx-bitcoin'></i>
          </div>
          <h2>Iniciar Sesion</h2>

          <form action='' className='form'>
            <input type='text' placeholder='Email' />
            <input type='text' placeholder='Password' />
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
