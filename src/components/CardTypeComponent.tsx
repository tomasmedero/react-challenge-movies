import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getAPIMedia } from '../helpers'

type Props = {
  titleTypeInfo: string
  link: string
  title: string
  description: string
}

const previewIndex: Record<string, number> = {
  now_playing: 0,
  upcoming: 3,
  top_rated: 1,
  popular: 2,
  airing_today: 0,
  on_the_air: 3,
}

export const CardTypeComponent = ({
  titleTypeInfo,
  link,
  title,
  description,
}: Props) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    let isActive = true

    getAPIMedia({ typeMedia: titleTypeInfo, typeSearch: link })
      .then((titles) => {
        if (isActive) {
          const selectedTitle = titles[previewIndex[link] || 0] || titles[0]
          setImageUrl(selectedTitle?.posterUrl || '')
        }
      })
      .catch((error) => console.error('No se pudo cargar la portada:', error))

    return () => {
      isActive = false
    }
  }, [link, titleTypeInfo])

  return (
    <NavLink
      to={`/${titleTypeInfo}/${link}`}
      className='group relative isolate block aspect-[4/5] overflow-hidden rounded-3xl bg-slate-800 shadow-2xl shadow-black/20 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400'
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=''
          loading='lazy'
          className='absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105'
        />
      ) : (
        <div className='absolute inset-0 -z-20 animate-pulse bg-slate-800' />
      )}
      <div className='absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-900/5' />
      <div className='flex h-full flex-col justify-end p-5 sm:p-6'>
        <span className='mb-3 h-1 w-10 rounded-full bg-cyan-400 transition-all group-hover:w-16' />
        <h2 className='text-xl font-black text-white sm:text-2xl'>{title}</h2>
        <p className='mt-2 text-sm leading-5 text-slate-300'>{description}</p>
        <span className='mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300'>
          Explorar <span aria-hidden='true'>→</span>
        </span>
      </div>
    </NavLink>
  )
}
