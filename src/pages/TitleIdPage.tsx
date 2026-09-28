import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { LoadingPage } from '../auth/pages'
import { IdCard } from '../components/IdCard'
import { getTitleById } from '../helpers'
import { RootState } from '../store/store'
import { TitleInfo } from '../types/types'

export const TitleIdPage = () => {
  const [title, setTitle] = useState<TitleInfo>()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { id, typeMedia } = useParams()
  const { name } = useSelector((state: RootState) => state.country)

  useEffect(() => {
    let isActive = true

    const fetchTitle = async () => {
      if (!id || !typeMedia) return

      setIsLoading(true)
      setHasError(false)
      const data = await getTitleById({ id: Number(id), typeMedia, countryName: name })

      if (!isActive) return
      if (data) setTitle(data)
      else setHasError(true)
      setIsLoading(false)
    }

    fetchTitle()
    return () => {
      isActive = false
    }
  }, [id, typeMedia, name])

  if (isLoading) return <div className='min-h-[calc(100vh-4rem)] bg-slate-950'><LoadingPage /></div>

  if (hasError || !title) {
    return (
      <main className='grid min-h-[calc(100vh-4rem)] place-items-center bg-slate-950 px-4 text-center text-white'>
        <div>
          <h1 className='text-3xl font-black'>No pudimos cargar este título</h1>
          <p className='mt-3 text-slate-400'>Intentá nuevamente en unos minutos.</p>
        </div>
      </main>
    )
  }

  return <IdCard title={title} />
}
