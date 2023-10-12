import { useEffect, useState } from 'react'
import { getAPIMovies, getAPISeries } from '../helpers'
import { TitleInfo } from '../types/types'
import { TitleCard } from '../components'
import { useLocation } from 'react-router-dom'

export const TopTitlePage = () => {
  const [titles, setTitles] = useState<TitleInfo[]>([])
  const location = useLocation()

  let pageInfo: string = ''
  const path = location.pathname

  if (path.startsWith('/movie')) {
    pageInfo = 'Peliculas'
  } else if (path.startsWith('/tv')) {
    pageInfo = 'Series'
  }

  useEffect(() => {
    async function fetchTitles() {
      try {
        let data: TitleInfo[] = []

        if (location.pathname === '/movie/top20') {
          data = await getAPIMovies()
        } else if (location.pathname === '/tv/top20') {
          data = await getAPISeries()
        }

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
