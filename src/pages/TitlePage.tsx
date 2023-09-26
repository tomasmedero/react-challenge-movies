import { useEffect, useState } from 'react'
import { getAPIMovies, getAPISeries } from '../helpers'
import { TitleInfo } from '../types/types'
import { TitleCard } from '../components'
import { useLocation } from 'react-router-dom'

export const TitlePage = () => {
  const [titles, setTitles] = useState<TitleInfo[]>([])
  const location = useLocation()

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
  }, [])

  return <TitleCard titles={titles} />
}
