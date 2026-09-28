import { useEffect, useState } from 'react'
import { TitleInfo } from '../types/types'
import { TitleCard } from '../components'
import { useParams } from 'react-router-dom'
import { getAPIMedia } from '../helpers'
import { useTypeSearch } from '../hooks/useTypeSearch'

export const TypeMediaPage = () => {
  const [titles, setTitles] = useState<TitleInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { typeSearch, typeMedia } = useParams()

  const { pageTitle } = useTypeSearch(typeSearch)


  useEffect(() => {
    async function fetchTitles() {
      setIsLoading(true)
      try {
        const data = await getAPIMedia({ typeSearch, typeMedia })
        setTitles(data)
      } catch (error) {
        console.error('Error fetching movie name:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTitles()
  }, [typeMedia, typeSearch])

  return (
    <main className='min-h-[calc(100vh-4rem)] bg-slate-100 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <p className='text-sm font-bold uppercase tracking-[0.2em] text-cyan-700'>Catálogo</p>
        <h1 className='mb-8 mt-2 text-3xl font-black text-slate-950 sm:text-5xl'>{pageTitle}</h1>
        {isLoading ? (
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5'>
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className='animate-pulse'>
                <div className='aspect-[2/3] rounded-2xl bg-slate-200' />
                <div className='mt-3 h-4 rounded bg-slate-200' />
              </div>
            ))}
          </div>
        ) : (
          <TitleCard titles={titles} />
        )}
      </div>
    </main>
  )
}
