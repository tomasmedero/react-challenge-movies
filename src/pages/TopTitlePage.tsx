import { useEffect, useState } from 'react'
import { getAPITrending } from '../helpers'
import { TitleInfo } from '../types/types'
import { TitleCard } from '../components'
import { usePageInfo } from '../hooks/usePageInfo'
import { useParams } from 'react-router-dom'

export const TopTitlePage = () => {
  const [titles, setTitles] = useState<TitleInfo[]>([])

  const { typeMedia } = useParams()

  const { pageInfo, searchType } = usePageInfo(typeMedia)

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
  }, [searchType])

  return (
    <>
      <h2 className='text-4xl font-extrabold text-center dark:text-white mt-5 ml-3'>
        Tendencia Semanal de {pageInfo}
      </h2>
      <TitleCard titles={titles} />
    </>
  )
}
