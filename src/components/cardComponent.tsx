import { NavLink } from 'react-router-dom'

type Props = {
  link: string
  image: string
  title: string
}

export const CardComponent = (props: Props) => {
  const { link, image, title } = props

  return (
    <div className=' w-1/4 p-3  items-center '>
      <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
        <NavLink to={`/${link}`}>
          <img className='rounded-t-lg mt-3 mx-auto' src={`/${image}`} alt='' />
        </NavLink>
        <div className='p-5'>
          <h6
            className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center w-full overflow-hidden whitespace-nowrap'
            style={{ textOverflow: 'ellipsis' }}
          >
            {title}
          </h6>
        </div>
      </div>
    </div>
  )
}
