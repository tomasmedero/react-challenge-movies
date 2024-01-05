import { NavLink } from 'react-router-dom'

type Props = {
  titleTypeInfo: string

  link: string
  image: string
}

export const CardTypeComponent = (props: Props) => {
  const { titleTypeInfo, link, image } = props

  return (
    <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/4 p-3 items-center flex justify-center'>
      <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700 '>
        <NavLink to={`/${titleTypeInfo}/${link}`} className='block'>
          <img
            className='rounded-t-lg mt-3 mx-auto w-full h-auto object-cover'
            src={`/${titleTypeInfo}${image}.jpg`}
            alt=''
          />
        </NavLink>
      </div>
    </div>
  )
}
