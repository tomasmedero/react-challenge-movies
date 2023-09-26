import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../helpers'
import { useMemo } from 'react'

export const HeroPage = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const hero = useMemo(() => getHeroById(id), [id])

  const onReturnBack = () => {
    navigate(-1)
  }

  if (!hero) {
    return <Navigate to='/naruto' />
  }

  // <Link to={`/hero/${id}`}>Mas Info..</Link>
  return (
    <>
      <div className='row mt-5'>
        <div className='col-4'>
          <img
            src={`/assets/heroes/${id}.jpg`}
            alt={hero.superhero}
            className='img-thumbnail animate__animated animate__flipInY'
          />
        </div>

        <div className='col-8'>
          <h3>{hero.superhero}</h3>

          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <b>Alias:</b> {hero.alias}{' '}
            </li>
            <li className='list-group-item'>
              <b>Serie:</b> {hero.publisher}
            </li>
            <li className='list-group-item'>
              <b>Primera Aparicion:</b> {hero.first_appearance}
            </li>
          </ul>
          <h5 className='mt-3'> Organizaciones</h5>
          <p>{hero.organization}</p>

          <button className='btn btn-outline-primary' onClick={onReturnBack}>
            Volver
          </button>
        </div>
      </div>
    </>
  )
}
