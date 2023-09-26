import { useEffect, useState } from 'react'
import { getAPIMovies, getAPISeries } from '../helpers'
import { TitleInfo } from '../types/types'
import { InfoBar, TitleCard } from '../components'
import { useLocation } from 'react-router-dom'

export const TitlePage = () => {
  const [titles, setTitles] = useState<TitleInfo[]>([])
  const location = useLocation()
  const [info, setInfo] = useState<string>('Titles')

  useEffect(() => {
    let pageInfo: string = 'Titulos'
    if (location.pathname === '/series') {
      pageInfo = 'Series'
    } else if (location.pathname === '/peliculas') {
      pageInfo = 'Peliculas'
    } else if (location.pathname === '/') {
      pageInfo = 'Titulos'
    }
    setInfo(pageInfo)
  }, [location.pathname])

  useEffect(() => {
    async function fetchTitles() {
      try {
        let data: TitleInfo[] = []

        if (location.pathname === '/peliculas') {
          data = await getAPIMovies()
        } else if (location.pathname === '/series') {
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
      <InfoBar pageInfo={info} />
      <TitleCard titles={titles} />
    </>
  )
}
