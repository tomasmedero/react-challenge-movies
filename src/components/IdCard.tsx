import { useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingPage } from '../auth/pages'
import { RootState } from '../store/store'
import { toggleFavorite } from '../store/titles/titleSlice'
import { FavoriteTitle, FlatRateProps, IdCardProps } from '../types/types'
import { CommentComponent } from './CommentComponent'
import { Toast } from './Toast'

type ProviderGroupProps = {
  title: string
  providers: FlatRateProps[]
  link?: string
}

const ProviderGroup = ({ title, providers, link }: ProviderGroupProps) => {
  if (providers.length === 0) return null

  return (
    <div className='px-4 my-3'>
      <p className='text-base font-semibold mb-2'>{title}</p>
      <div className='flex flex-wrap gap-2'>
        {providers.map((provider) => (
          <a
            key={provider.provider_id}
            href={link}
            target='_blank'
            rel='noreferrer'
            title={provider.provider_name}
            aria-label={`${provider.provider_name}: ${title.toLowerCase()}`}
            className='border border-gray-300 rounded-md p-1 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <img
              src={`https://image.tmdb.org/t/p/w154${provider.logo_path}`}
              alt={provider.provider_name}
              className='h-14 w-14 rounded object-cover shadow'
            />
          </a>
        ))}
      </div>
    </div>
  )
}

const getRatingColorClass = (rating: number) => {
  if (rating === 0) return 'bg-gray-100 text-gray-500 border border-gray-300'
  if (rating <= 3) return 'bg-red-200 text-red-800 border border-red-800'
  if (rating <= 6) return 'bg-yellow-200 text-yellow-800 border border-yellow-800'
  if (rating <= 8) return 'bg-green-200 text-green-800 border border-green-800'
  return 'bg-emerald-200 text-emerald-800 border border-emerald-800'
}

export const IdCard: React.FC<IdCardProps> = ({ title }) => {
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({ show: false, message: '', type: 'success' })
  const { status } = useSelector((state: RootState) => state.auth)
  const countryName = useSelector((state: RootState) => state.country.name)
  const favorites = useSelector((state: RootState) => state.title.favorites)
  const dispatch = useDispatch()

  if (!title) return <LoadingPage />

  const mediaType = title.media_type || ''
  const favoriteKey = `${mediaType}:${title.id}`
  const isFavorite = Boolean(favorites[favoriteKey])
  const hasProviders = Boolean(
    title.watchProviderFlatrate?.length ||
      title.watchProviderRent?.length ||
      title.watchProviderBuy?.length
  )
  const favorite: FavoriteTitle = {
    id: String(title.id),
    name: title.name,
    media_type: mediaType,
    posterUrl: title.posterUrl,
    description: title.description,
    rating: title.rating,
    releaseDay: title.releaseDay,
    programType: title.programType || (mediaType === 'movie' ? 'Película' : 'Serie TV'),
  }

  const onToggle = () => {
    dispatch(toggleFavorite(favorite))
    setToast({
      show: true,
      message: isFavorite
        ? `“${title.name}” se eliminó de tus favoritos`
        : `“${title.name}” se añadió a tus favoritos`,
      type: isFavorite ? 'error' : 'success',
    })
  }

  return (
    <>
      <div className='min-h-screen grid place-items-center font-mono mt-2'>
        <div className='border-2 border-gray-400 rounded-md bg-zinc-100 shadow-lg'>
          <div className='md:flex px-4 leading-none max-w-4xl'>
            <div className='flex-none'>
              <img src={title.posterUrl} alt={`Póster de ${title.name}`} className='h-96 w-58 rounded-md transform -translate-y-4 border-4 border-gray-300 shadow-lg' />
            </div>

            <div className='flex-col text-gray-600'>
              <p className='pt-4 text-3xl font-bold text-center'>
                {title.name} {title.releaseDay && `(${title.releaseDay})`}
              </p>
              <p className='md:block px-4 my-4 text-base text-left'>{title.description}</p>
              <div className='flex items-center px-4 my-2'>
                <span className='mr-2'>Rating:</span>
                <span className={`${getRatingColorClass(title.rating)} inline-block font-bold rounded-lg px-2 py-1 text-sm`}>
                  {title.rating === 0 ? '-' : `${title.rating}/10`}
                </span>
              </div>
              <p className='flex text-base px-4 mt-3 mb-3'>
                {title.runtime
                  ? `Duración: ${Math.floor(title.runtime / 60)}h ${title.runtime % 60}min`
                  : `Temporadas: ${title.seasons || 0} · Episodios: ${title.episodes || 0}`}
              </p>
              {title.genres && (
                <p className='flex text-base px-4 my-2'>
                  Géneros: {title.genres.map((genre) => genre.name).join(', ')}
                </p>
              )}

              <div className='text-sm pb-3'>
                <ProviderGroup title='Incluido con suscripción' providers={title.watchProviderFlatrate || []} link={title.watchProviderLink} />
                <ProviderGroup title='Disponible para alquilar' providers={title.watchProviderRent || []} link={title.watchProviderLink} />
                <ProviderGroup title='Disponible para comprar' providers={title.watchProviderBuy || []} link={title.watchProviderLink} />
                {!hasProviders && (
                  <p className='mx-4 my-3 rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700' role='status'>
                    No encontramos opciones de streaming, alquiler o compra para {countryName}.
                  </p>
                )}
              </div>
            </div>
          </div>

          {status === 'autenticado' && (
            <div className='flex justify-between items-center px-4 mb-4 w-full'>
              <button type='button' onClick={onToggle} aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'} className='text-4xl text-red-600 px-4 py-2 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-red-500'>
                {isFavorite ? <IoHeart /> : <IoHeartOutline />}
              </button>
            </div>
          )}
        </div>
        {status === 'autenticado' && <CommentComponent />}
      </div>

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast((current) => ({ ...current, show: false }))} />
      )}
    </>
  )
}
