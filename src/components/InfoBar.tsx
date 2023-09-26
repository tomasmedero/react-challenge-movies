import { InfoBarProps } from '../types/types'

export const InfoBar: React.FC<InfoBarProps> = ({ pageInfo }) => {
  return (
    <>
      <h2 className='text-4xl font-extrabold text-center dark:text-white mt-5 ml-3'>
        Top 20 Trending {pageInfo}
      </h2>
    </>
  )
}
