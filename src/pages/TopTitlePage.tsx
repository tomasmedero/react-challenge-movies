import { useEffect, useState } from 'react'
import { getAPITrending } from '../helpers'
import { TitleInfo } from '../types/types'
import { TitleCard } from '../components'
import { useLocation } from 'react-router-dom'
import { usePageInfo } from '../hooks/usePageInfo'

export const TopTitlePage = () => {
  const [titles, setTitles] = useState<TitleInfo[]>([])
  const location = useLocation()

  const path = location.pathname

  const { pageInfo, searchType } = usePageInfo(path)

  useEffect(() => {
    async function fetchTitles() {
      try {
        const data = await getAPITrending({ searchType })
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
        Tendencia Semanal de {pageInfo}
      </h2>
      <TitleCard titles={titles} />
    </>
  )
}
