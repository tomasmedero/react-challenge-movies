import { useEffect, useState } from 'react'
import { getData } from '../helpers/getData'
import { TitleInfo } from '../types/types'

export const SeriesPage = () => {
  const [series, setSeries] = useState<TitleInfo[]>([])
  const datype = 'series'

  useEffect(() => {
    function fetchSeries() {
      try {
        const dataSeries = getData(datype)
        dataSeries.sort((a, b) => a.title.localeCompare(b.title))
        const limitedDataSeries = dataSeries.slice(0, 21)
        setSeries(limitedDataSeries)
      } catch (error) {
        console.error('Error fetching movie name:', error)
      }
    }

    fetchSeries()
  }, [])

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-6 gap-4 mt-5 ml-5 mb-5'>
        {series.map((serie) => (
          <div className='flex justify-left mt-5 ml-3 w-40' key={serie.id}>
            <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
              <img className='rounded-t-lg mx-auto' src={serie.url} alt='' />

              <div className='p-5'>
                <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
                  {serie.title}
                </h6>
                <small>{serie.releaseYear}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
