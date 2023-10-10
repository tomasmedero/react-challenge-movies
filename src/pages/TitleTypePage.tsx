import { ShowTypeComponent } from '../components'
import { InfoBarProps } from '../types/types'

export const TitleTypePage: React.FC<InfoBarProps> = ({ pageInfo }) => {
  return (
    <>
      <ShowTypeComponent pageInfo={pageInfo} />
    </>
  )
}
