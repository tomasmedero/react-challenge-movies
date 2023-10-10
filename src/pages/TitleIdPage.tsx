import { useParams } from 'react-router-dom'
import { getTitleById } from '../helpers'
import { useEffect, useState } from 'react'
import { TitleInfo } from '../types/types'
import { IdCard } from '../components/IdCard'

export const TitleIdPage = () => {
  const [title, setTitle] = useState<TitleInfo | undefined>(undefined)
  let { id } = useParams()

  useEffect(() => {
    async function fetchTitle() {
      try {
        let titleTypeInfo: string = ''
        const path = location.pathname

        if (path.startsWith('/movie/')) {
          titleTypeInfo = 'movie'
        } else if (path.startsWith('/tv/')) {
          titleTypeInfo = 'tv'
        }

        let data = await getTitleById(id, titleTypeInfo)

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
  }, [])

  return (
    <>
      <IdCard title={title} />
    </>
  )
}
