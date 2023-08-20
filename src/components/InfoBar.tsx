import { InfoBarProps } from '../types/types'

export const InfoBar: React.FC<InfoBarProps> = ({ pageInfo }) => {
  return (
    <>
      <h2 className='text-4xl font-extrabold dark:text-white mt-5 ml-3'>
        Popular {pageInfo}
      </h2>
    </>
  )
}
