import { useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
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
    <section>
      <h3 className='mb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-400'>{title}</h3>
      <div className='flex flex-wrap gap-3'>
        {providers.map((provider) => (
          <a
            key={provider.provider_id}
            href={link || undefined}
            target='_blank'
            rel='noreferrer'
            title={provider.provider_name}
            aria-label={`${provider.provider_name}: ${title.toLowerCase()}`}
            className='group rounded-2xl bg-white/10 p-1 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400'
          >
            <img src={`https://image.tmdb.org/t/p/w154${provider.logo_path}`} alt={provider.provider_name} className='h-14 w-14 rounded-xl object-cover sm:h-16 sm:w-16' />
          </a>
        ))}
      </div>
    </section>
  )
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

  if (!title) return null

  const mediaType = title.media_type || ''
  const favoriteKey = `${mediaType}:${title.id}`
  const isFavorite = Boolean(favorites[favoriteKey])
  const hasProviders = Boolean(
    title.watchProviderFlatrate?.length ||
      title.watchProviderRent?.length ||
      title.watchProviderBuy?.length
  )
  const details = [
    title.releaseDay ? String(title.releaseDay) : '',
    title.runtime
      ? `${Math.floor(title.runtime / 60)}h ${title.runtime % 60}min`
      : title.seasons
        ? `${title.seasons} temporada${title.seasons === 1 ? '' : 's'}`
        : '',
    title.programType || '',
  ].filter(Boolean)
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
      <main className='relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 text-white'>
        {title.backdropUrl && (
          <div className='absolute inset-x-0 top-0 h-[34rem] sm:h-[40rem]'>
            <img src={title.backdropUrl} alt='' className='h-full w-full object-cover object-center opacity-30' />
            <div className='absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/80 to-slate-950' />
          </div>
        )}

        <div className='relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-16 md:grid-cols-[minmax(220px,320px)_1fr] md:gap-12 lg:px-8'>
          <div className='mx-auto w-full max-w-[300px] md:mx-0'>
            <img src={title.posterUrl} alt={`Póster de ${title.name}`} className='aspect-[2/3] w-full rounded-3xl object-cover shadow-2xl shadow-black/50 ring-1 ring-white/15' />
          </div>

          <div className='flex min-w-0 flex-col justify-center rounded-3xl bg-slate-950/70 p-5 shadow-2xl shadow-black/20 ring-1 ring-white/10 backdrop-blur-md sm:p-8'>
            <div className='flex flex-wrap items-start justify-between gap-4'>
              <div>
                <p className='mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-400'>{title.programType}</p>
                <h1 className='max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl'>{title.name}</h1>
                {title.originalName && title.originalName !== title.name && (
                  <p className='mt-2 text-base text-slate-400 sm:text-lg'>{title.originalName}</p>
                )}
              </div>
              {status === 'autenticado' && (
                <button type='button' onClick={onToggle} aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'} className='grid h-12 w-12 flex-none place-items-center rounded-full border border-white/15 bg-white/10 text-2xl text-rose-400 backdrop-blur transition hover:scale-105 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-rose-400'>
                  {isFavorite ? <IoHeart /> : <IoHeartOutline />}
                </button>
              )}
            </div>

            <div className='mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-300'>
              <span className='rounded-lg bg-emerald-400 px-2.5 py-1.5 font-black text-emerald-950'>{title.rating === 0 ? 'Sin puntuación' : `${title.rating}/10`}</span>
              {details.map((detail) => <span key={detail}>{detail}</span>)}
            </div>

            {title.genres && title.genres.length > 0 && (
              <div className='mt-5 flex flex-wrap gap-2'>
                {title.genres.map((genre) => (
                  <span key={genre.id} className='rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200'>{genre.name}</span>
                ))}
              </div>
            )}

            <p className='mt-7 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8'>{title.description}</p>

            <div className='mt-9 rounded-3xl border border-white/10 bg-slate-900/75 p-5 shadow-xl backdrop-blur sm:p-7'>
              <div className='mb-6 flex flex-wrap items-baseline justify-between gap-2'>
                <h2 className='text-xl font-black sm:text-2xl'>Dónde ver</h2>
                <span className='text-sm text-slate-400'>Disponibilidad en {countryName}</span>
              </div>
              {hasProviders ? (
                <div className='grid gap-7 lg:grid-cols-3'>
                  <ProviderGroup title='Suscripción' providers={title.watchProviderFlatrate || []} link={title.watchProviderLink} />
                  <ProviderGroup title='Alquiler' providers={title.watchProviderRent || []} link={title.watchProviderLink} />
                  <ProviderGroup title='Compra' providers={title.watchProviderBuy || []} link={title.watchProviderLink} />
                </div>
              ) : (
                <p className='rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-slate-300' role='status'>
                  No encontramos opciones de streaming, alquiler o compra para {countryName}.
                </p>
              )}
            </div>
          </div>
        </div>

        {status === 'autenticado' && <CommentComponent />}
      </main>

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast((current) => ({ ...current, show: false }))} />}
    </>
  )
}
