import { useParams } from 'react-router-dom'
import { getTitleById } from '../helpers'
import { useEffect, useState } from 'react'
import { TitleInfo } from '../types/types'
import { IdCard } from '../components/IdCard'

export const TitleIdPage = () => {
  const [title, setTitle] = useState<TitleInfo | undefined>(undefined)
  const { id, typeMedia } = useParams()

  useEffect(() => {
    async function fetchTitle() {
      if (id !== undefined && typeMedia !== undefined) {
        try {
          const data = await getTitleById({ id: Number(id), typeMedia })

          if (data !== null) {
            setTitle(data)
          } else {
            console.error('Hiciste mal un error en el fetch:')
          }
        } catch (error) {
          console.error('Hubo un tremendo error en el catch:', error)
        }
      }
    }

    fetchTitle()
  }, [id, typeMedia])

  return (
    <>
      <IdCard title={title} />
    </>
  )
}
