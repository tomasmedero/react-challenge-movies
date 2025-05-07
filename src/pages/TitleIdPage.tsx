import { useParams } from 'react-router-dom'
import { getTitleById } from '../helpers'
import { useEffect, useState } from 'react'
import { TitleInfo } from '../types/types'
import { IdCard } from '../components/IdCard'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const TitleIdPage = () => {
  const [title, setTitle] = useState<TitleInfo | undefined>(undefined)
  const { id, typeMedia } = useParams()
  const { name } = useSelector((state: RootState) => state.country)

  useEffect(() => {
    async function fetchTitle() {
      if (id !== undefined && typeMedia !== undefined) {
        try {
          const data = await getTitleById({ id: Number(id), typeMedia, countryName: name })

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
  }, [id, typeMedia, name])

  return (
    <>
      <div className="container mx-auto pt-8">
        <IdCard title={title} />
      </div>
    </>
  )
}
