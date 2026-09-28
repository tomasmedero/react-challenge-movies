import { Link } from 'react-router-dom'
import { TitleCardProps } from '../types/types'

const getRatingColorClass = (rating: number) => {
  if (rating >= 8) return 'bg-emerald-400 text-emerald-950'
  if (rating >= 6) return 'bg-amber-300 text-amber-950'
  if (rating > 0) return 'bg-rose-400 text-rose-950'
  return 'bg-slate-700 text-slate-200'
}

export const TitleCard: React.FC<TitleCardProps> = ({ titles }) => (
  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5'>
    {titles.map(({ id, programType, posterUrl, name, rating, releaseDay, media_type }) => (
      <article key={`${media_type}-${id}`} className='group min-w-0'>
        <Link to={`/card/${media_type}/${id}`} className='block focus:outline-none'>
          <div className='relative aspect-[2/3] overflow-hidden rounded-2xl bg-slate-200 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-slate-900/20 group-focus-within:ring-2 group-focus-within:ring-cyan-500'>
            <img
              src={posterUrl}
              alt={`Póster de ${name}`}
              loading='lazy'
              className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/75 to-transparent' />
            <span className={`absolute right-2 top-2 rounded-lg px-2 py-1 text-xs font-black shadow ${getRatingColorClass(Number(rating))}`}>
              {Number(rating) === 0 ? '—' : Number(rating).toFixed(1)}
            </span>
          </div>
          <h2 className='mt-3 line-clamp-2 text-sm font-extrabold leading-5 text-slate-900 transition group-hover:text-cyan-700 sm:text-base'>{name}</h2>
          <div className='mt-1 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 sm:text-sm'>
            {programType && <span>{programType}</span>}
            {releaseDay && <span aria-hidden='true'>•</span>}
            {releaseDay && <span>{releaseDay}</span>}
          </div>
        </Link>
      </article>
    ))}
  </div>
)
