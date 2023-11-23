import { useParams } from 'react-router-dom'
import { getTitleById } from '../helpers'
import { useEffect, useState } from 'react'
import { TitleInfo } from '../types/types'
import { IdCard } from '../components/IdCard'
import { usePageInfo } from '../hooks/usePageInfo'

export const TitleIdPage = () => {
  const [title, setTitle] = useState<TitleInfo | undefined>(undefined)
  let { id } = useParams()
  const path = location.pathname

  useEffect(() => {
    async function fetchTitle() {
      try {
        const { searchType } = usePageInfo(path)

        let data = await getTitleById({ id, searchType })

        if (data !== null) {
          setTitle(data)
        } else {
          console.error('Error fetching the data fix please:')
        }
      } catch (error) {
        console.error('Error fetching the data fix please:', error)
      }
    }

    fetchTitle()
  }, [id])

  return (
    <>
      <IdCard title={title} />
    </>
  )
}
