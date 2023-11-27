import { useParams } from 'react-router-dom'
import { getTitleById } from '../helpers'
import { useEffect, useState } from 'react'
import { TitleInfo } from '../types/types'
import { IdCard } from '../components/IdCard'
import { usePageInfo } from '../hooks/usePageInfo'

export const TitleIdPage = () => {
  const [title, setTitle] = useState<TitleInfo | undefined>(undefined)
  const { id } = useParams()
  const path = location.pathname
  const { searchType } = usePageInfo(path)

  useEffect(() => {
    async function fetchTitle() {
      try {
        const data = await getTitleById({ id: Number(id), searchType })

        if (data !== null) {
          setTitle(data)
        } else {
          console.error('Hiciste mal un error en el fetch:')
        }
      } catch (error) {
        console.error('Hubo un tremendo error en el catch:', error)
      }
    }

    fetchTitle()
  }, [id, path, searchType])

  return (
    <>
      <IdCard title={title} />
    </>
  )
}
