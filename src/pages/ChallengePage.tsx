import { CardComponent } from '../components'

export const ChallengePage = () => {
  return (
    <>
      <div className='flex flex-wrap justify-left mt-5 ml-3'>
        <CardComponent link='tv' image='tvPH.jpg' title='Series' />
        <CardComponent link='movie' image='moviePH.jpg' title='Peliculas' />
        <CardComponent link='tendency' image='tendency.jpg' title='Tendencia' />
      </div>
    </>
  )
}

//TODO
// En el componente de la movie o serie que tenga una parte de comentarios y solo te deje comentar si esta logueado
//Hacer uno de Person List que sea Person: Popular
