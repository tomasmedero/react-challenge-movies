import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAPITrending } from '../helpers'
import { TitleInfo } from '../types/types'

interface CarouselProps {
  searchType: string
  title: string
  className?: string
}

const getRatingColorClass = (rating: number) => {
  if (rating >= 8) return 'bg-emerald-400 text-emerald-950'
  if (rating >= 6) return 'bg-amber-300 text-amber-950'
  if (rating > 0) return 'bg-rose-400 text-rose-950'
  return 'bg-slate-700 text-slate-200'
}

export const CarouselComponent = ({ searchType, title, className }: CarouselProps) => {
  const [titles, setTitles] = useState<TitleInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    getAPITrending({ searchType })
      .then((data) => {
        if (isActive) setTitles(data)
      })
      .catch((error) => console.error('No se pudieron cargar las tendencias:', error))
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [searchType])

  return (
    <section className={className}>
      <div className='mb-5 flex items-end justify-between gap-4'>
        <div>
          <p className='mb-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-400'>Selección destacada</p>
          <h2 className='text-xl font-extrabold text-white sm:text-3xl'>{title}</h2>
        </div>
        <span className='hidden text-sm text-slate-500 sm:block'>Deslizá para explorar →</span>
      </div>

      <div className='no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-5'>
        {isLoading
          ? Array.from({ length: 6 }, (_, index) => (
              <div key={index} className='w-36 flex-none animate-pulse sm:w-48'>
                <div className='aspect-[2/3] rounded-2xl bg-slate-800' />
                <div className='mt-3 h-4 rounded bg-slate-800' />
              </div>
            ))
          : titles.map(({ id, posterUrl, name, rating, media_type, releaseDay }) => (
              <article key={`${media_type}-${id}`} className='group w-36 flex-none snap-start sm:w-48'>
                <Link to={`/card/${media_type}/${id}`} className='block focus:outline-none'>
                  <div className='relative aspect-[2/3] overflow-hidden rounded-2xl bg-slate-800 shadow-xl shadow-black/20 ring-1 ring-white/10 transition duration-300 group-hover:-translate-y-1 group-hover:ring-cyan-400/60 group-focus-within:ring-2 group-focus-within:ring-cyan-400'>
                    <img src={posterUrl} alt={`Póster de ${name}`} loading='lazy' className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
                    <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/90 to-transparent' />
                    <span className={`absolute right-2 top-2 rounded-lg px-2 py-1 text-xs font-black shadow ${getRatingColorClass(Number(rating))}`}>
                      {Number(rating) === 0 ? '—' : Number(rating).toFixed(1)}
                    </span>
                  </div>
                  <h3 className='mt-3 line-clamp-2 text-sm font-bold leading-5 text-slate-100 transition group-hover:text-cyan-300 sm:text-base'>{name}</h3>
                  <p className='mt-1 text-xs text-slate-500'>{releaseDay || 'Fecha por confirmar'}</p>
                </Link>
              </article>
            ))}
      </div>
    </section>
  )
}
