import { useEffect, useState } from 'react'
import { getAPITop } from '../helpers'
import { TitleInfo } from '../types/types'
import { TitleCard } from '../components'
import { useLocation } from 'react-router-dom'

export const TopTitlePage = () => {
  const [titles, setTitles] = useState<TitleInfo[]>([])
  const location = useLocation()

  let pageInfo: string = ''
  let titleType: string = ''
  const path = location.pathname

  if (path.startsWith('/movie')) {
    pageInfo = 'Peliculas'
    titleType = 'movie'
  } else if (path.startsWith('/tv')) {
    pageInfo = 'Series'
    titleType = 'tv'
  }

  useEffect(() => {
    async function fetchTitles() {
      try {
        const data = await getAPITop({ titleType })
        setTitles(data)
      } catch (error) {
        console.error('Error fetching movie name:', error)
      }
    }

    fetchTitles()
  }, [location.pathname])

  return (
    <>
      <h2 className='text-4xl font-extrabold text-center dark:text-white mt-5 ml-3'>
        Top 20 Semanal de {pageInfo}
      </h2>
      <TitleCard titles={titles} />
    </>
  )
}
