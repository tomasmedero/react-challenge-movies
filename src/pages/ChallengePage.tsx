import { SearchPage } from './SearchPage';

export const ChallengePage = () => {
  return (
    <>
      <h2 className='text-4xl font-extrabold text-center dark:text-white mt-5 ml-3 mb-5'>
        Peliculas & Series
      </h2>

      <SearchPage />



    </>
  )
}

//TODO  Paginacion Hace que el anterior no aparezca si esta en pagina 1
//TODO Hacer que el favorites se guarde la db y se muestre en el tab de favoritos
//TODO  Hacer boton de viendo
//TODO  Que funcionen los comentarios
//TODO Hacer lo de la geolocalizacion
//TODO Quiero que cuando vuelvas para atras en una card vuelva a la busqueda y no vuelva totalmente al inicio


