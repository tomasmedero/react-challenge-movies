import { NavLink } from 'react-router-dom'

type Props = {
  titleTypeInfo: string
  pageInfo: string
  link: string
  image: string
}

export const CardTypeComponent = (props: Props) => {
  const { titleTypeInfo, pageInfo, link, image } = props

  return (
    <div className='w-1/4 p-3 items-center'>
      <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
        <NavLink to={`/${titleTypeInfo}/${link}`}>
          <img
            className='rounded-t-lg mt-3 mx-auto'
            src={`/${titleTypeInfo}${image}.jpg`}
            alt=''
          />
        </NavLink>
        <div className='p-5 text-center'>
          <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center'>
            {pageInfo}
          </h6>
        </div>
      </div>
    </div>
  )
}
