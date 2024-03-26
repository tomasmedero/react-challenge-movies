import { LoadingPage } from '../auth/pages'
import { FavoriteTitle, IdCardProps } from '../types/types'
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { CommentComponent } from './CommentComponent'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { toggleFavorite } from '../store/titles/titleSlice'




export const IdCard: React.FC<IdCardProps> = ({ title }) => {

  const id = title?.id;
  const name = title?.name;

  const { status } = useSelector((state: RootState) => state.auth)
  const favorites = useSelector((state: RootState) => state.title.favorites)
  const dispatch = useDispatch();

  const isFavorite = id !== undefined && !!favorites[id];


  const titleFav: FavoriteTitle = { id: id?.toString() || '', name: name || "" };
  const onToggle = () => {
    if (id !== undefined && name !== undefined) {
      dispatch(toggleFavorite(titleFav));
    } else {
      console.error("No se puede agregar un título favorito con valores indefinidos.");
    }
  }


  return (
    <>
      {title ? (
        <>
          <div className='min-h-screen grid place-items-center font-mono mt-2'>
            <div className=' border-2 border-gray-400  rounded-md bg-zinc-100 shadow-lg  space-x-2'>
              <div className='md:flex px-4 leading-none max-w-4xl'>
                <div className='flex-none '>
                  <img
                    src={title?.posterUrl}
                    alt='pic'
                    className='h-96 w-58 rounded-md transform -translate-y-4 border-4 border-gray-300 shadow-lg'
                  />
                </div>

                <div className='flex-col text-gray-600'>
                  <p className='pt-4 text-3xl font-bold text-center'>
                    {title?.name} ({title?.releaseDay})
                  </p>

                  <p className='md:block px-4 my-4 text-base text-left'>
                    {title?.description}
                  </p>

                  <p className='flex text-base px-4 my-2'>
                    Rating: {title?.rating}/10
                  </p>

                  <p className='flex text-base px-4  mt-3 mb-3'>
                    {title.runtime ? (
                      <>
                        Duración: {Math.floor(title.runtime / 60)}h{' '}
                        {title.runtime % 60}min
                      </>
                    ) : (
                      <>
                        Temporadas: {title.seasons} Episodios : {title.episodes}
                      </>
                    )}
                  </p>
                  {title.genres && (
                    <>
                      <p className='flex text-base px-4 my-2'>
                        Géneros:{' '}
                        {title.genres.map((genre) => genre.name).join(', ')}
                      </p>
                    </>
                  )}

                  <div className='text-sm'>
                    {title.watchProviderFlatrate &&
                      title.watchProviderFlatrate.length > 0 ? (
                      <>
                        <p className='flex text-base px-4 my-2 mt-3'>
                          Plataformas:
                        </p>
                        {title.watchProviderFlatrate.map((flatrate) => (
                          <button
                            key={flatrate.provider_id}
                            type='button'
                            className=' border border-gray-400 text-gray-600 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline'
                          >
                            <a href={title.watchProviderLink}>
                              <img
                                src={`https://image.tmdb.org/t/p/w500${flatrate.logo_path}`}
                                alt='pic'
                                className='h-20 w-20 shadow-lg'
                              />
                            </a>
                          </button>
                        ))}
                      </>
                    ) : (
                      <button
                        type='button'
                        className='border border-gray-400 text-gray-600 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-400 text-black-800 focus:outline-none focus:shadow-outline'
                      >
                        No disponible en plataformas de streaming
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {status === 'autenticado' &&
                (
                  <div className='flex justify-between items-center px-4 mb-4 w-full'>
                    <div className='flex'>
                      <div className='text-4xl  px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer' onClick={onToggle}>
                        <div className="text-red-600">

                          {
                            isFavorite
                              ? (<IoHeart />)
                              : (<IoHeartOutline />)
                          }

                        </div>

                      </div>

                    </div>
                  </div>
                )}

            </div>
            {status === 'autenticado' && <CommentComponent />}
          </div>
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  )
}
