type PaginationProps = {
  activePage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  activePage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const firstPage = Math.max(1, Math.min(activePage - 2, totalPages - 4))
  const pages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => firstPage + index
  )

  return (
    <nav aria-label='Paginación de resultados' className='flex items-center justify-center my-6'>
      <ul className='inline-flex -space-x-px text-sm'>
        <li>
          <button
            type='button'
            disabled={activePage === 1}
            onClick={() => onPageChange(activePage - 1)}
            className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Anterior
          </button>
        </li>
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type='button'
              aria-current={pageNumber === activePage ? 'page' : undefined}
              className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${
                pageNumber === activePage
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 bg-white hover:bg-gray-100'
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            type='button'
            disabled={activePage === totalPages}
            onClick={() => onPageChange(activePage + 1)}
            className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  )
}
