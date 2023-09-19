import { useEffect, useState } from 'react'
import { getAPISeries } from '../helpers'
import { SeriesInfo } from '../types/types'

export const SeriesPage = () => {
  const [series, setSeries] = useState<SeriesInfo[]>([])

  useEffect(() => {
    async function fetchTVSeries() {
      try {
        let data: SeriesInfo[] = []
        data = await getAPISeries()
        setSeries(data)
      } catch (error) {
        console.error('Error fetching movie name:', error)
      }
    }

    fetchTVSeries()
  }, [])

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-6 gap-4 mt-5 ml-5 mb-5'>
        {series.map((serie) => (
          <div className='flex justify-left mt-5 ml-3 w-40' key={serie.id}>
            <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
              <img
                className='rounded-t-lg mx-auto'
                src={`https://image.tmdb.org/t/p/w500${serie.posterUrl}`}
                alt=''
              />

              <div className='p-5'>
                <h6 className='mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white'>
                  {serie.name}
                </h6>
                <small>{serie.releaseDay}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
