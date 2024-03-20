import { useEffect, useState } from 'react'
import { TitleInfo } from '../types/types'
import { TitleCard } from '../components'
import { useParams } from 'react-router-dom'
import { getAPIMedia } from '../helpers'
import { useTypeSearch } from '../hooks/useTypeSearch'

export const TypeMediaPage = () => {
  const [titles, setTitles] = useState<TitleInfo[]>([])

  const { typeSearch, typeMedia } = useParams()

  const { pageTitle } = useTypeSearch(typeSearch)


  useEffect(() => {
    async function fetchTitles() {
      try {
        const data = await getAPIMedia({ typeSearch, typeMedia })
        setTitles(data)
      } catch (error) {
        console.error('Error fetching movie name:', error)
      }
    }

    fetchTitles()
  }, [typeMedia, typeSearch])

  return (
    <>
      <h2 className='text-4xl font-extrabold text-center dark:text-white mt-5 ml-3'>
        {pageTitle}
      </h2>
      <TitleCard titles={titles} />
    </>
  )
}
