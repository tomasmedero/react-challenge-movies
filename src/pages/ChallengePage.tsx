import { CardComponent } from '../components'

export const ChallengePage = () => {
  return (
    <>
      <h2 className='text-4xl font-extrabold text-center dark:text-white mt-5 ml-3'>
        Movies & Series
      </h2>
      <div className='flex flex-wrap justify-left mt-5 ml-3'>
        <CardComponent link='tv' image='tvtv.jpg' title='Series' />
        <CardComponent link='movie' image='moviemovie.jpg' title='Peliculas' />
        <CardComponent link='tendency' image='tendency.jpg' title='Tendencia' />
        <CardComponent link='search' image='search.jpg' title='Buscar' />
      </div>
    </>
  )
}


//TODO  Que funcionen los comentarios
//TODO Hacer que los cuadraditos se vean bien
//TODO  Hacer funcional el Boton de Favorito y el de Viendo
//TODO hacer banderas
//TODO Hacer lo de la geolocalizacion
