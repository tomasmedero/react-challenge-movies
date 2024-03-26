import { useEffect, useState } from 'react'
import { getAPITrending } from '../helpers'
import { TitleInfo } from '../types/types'
import { Pagination, TitleCard } from '../components'
import { usePageInfo } from '../hooks/usePageInfo'
import { useParams } from 'react-router-dom'

export const TopTitlePage = () => {
  const [titles, setTitles] = useState<TitleInfo[]>([])
  // const [currentPage, setCurrentPage] = useState<number>(1); // Estado para almacenar la página actual
  // const [totalPages, setTotalPages] = useState<number>(5); // Estado para almacenar el total de páginas
  const { typeMedia } = useParams();


  const { pageInfo, searchType } = usePageInfo(typeMedia)

  useEffect(() => {
    async function fetchTitles() {
      try {
        const data = await getAPITrending({ searchType })
        setTitles(data)
        // const titlesPerPage = 20;
        // const totalTitles = data.length;
        // const totalPages = Math.ceil(totalTitles / titlesPerPage);
        // setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching movie name:', error)
      }
    }

    fetchTitles()
  }, [searchType])

  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  //   // Aquí podrías llamar a la API nuevamente con el número de página para obtener los títulos correspondientes
  // };

  return (
    <>
      <h2 className='text-4xl font-extrabold text-center dark:text-white mt-5 ml-3'>
        Tendencia Semanal de {pageInfo}
      </h2>
      <TitleCard titles={titles} />
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
      <Pagination />

    </>
  )
}
