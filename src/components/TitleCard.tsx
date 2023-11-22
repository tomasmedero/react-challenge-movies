import { Link } from 'react-router-dom'
import { TitleCardProps } from '../types/types'

export const TitleCard: React.FC<TitleCardProps> = ({ titles }) => {
  return (
    <>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 m-3'>
        {titles.map((title) => (
          // Card

          <div className='py-2 sm:max-w-xl sm:mx-auto h-max-150' key={title.id}>
            <Link to={`/${title.programType}/${title.id}`}>
              {/* Contenido de la card */}
              <div
                className='bg-white shadow-lg border-gray-100 
            h-full border rounded-3xl p-2 items-center flex space-x-4'
              >
                {/* Columna Izquierda  */}
                <div className='overflow-visible w-1/2  '>
                  <img
                    className=' shadow-lg object-contain rounded-3xl'
                    src={title.posterUrl}
                    alt=''
                  />
                </div>

                {/* Columna Derecha */}
                <div className='flex flex-col w-1/2 justify-between h-full '>
                  {/* Titulo y rating */}
                  <div className='flex justify-between items-start gap-2 '>
                    <h2
                      className='line-clamp-2 text-lg font-bold tracking-tight'
                      data-te-toggle='tooltip'
                      title={title.name}
                    >
                      {title.name}
                    </h2>
                    <div className='bg-green-300 font-bold rounded-xl p-1'>
                      {title.rating}
                    </div>
                  </div>

                  <div className='max-h-20 overflow-hidden line-clamp-3'>
                    {title.description}
                  </div>

                  {/* Tipo de programa y Fecha */}
                  <div>
                    <div className='text-base text-gray-400'>
                      {title && title.programType && (
                        <p>
                          {title.programType.charAt(0).toUpperCase() +
                            title.programType.slice(1)}
                        </p>
                      )}
                    </div>
                    <div className='text-lg text-gray-800'>
                      {title.releaseDay}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
