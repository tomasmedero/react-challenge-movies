import { CardTypeComponent } from '../components'
import { usePageInfo } from '../hooks/usePageInfo'

export const TitleTypePage = () => {
  const path = location.pathname

  const { pageInfo, searchType } = usePageInfo(path)

  return (
    <>
      <div className='flex flex-wrap justify-left mt-5 ml-3'>
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo={`Tendencia ${pageInfo}`}
          link='top20'
          image='Tendency'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo={`Buscar ${pageInfo}`}
          link='search'
          image='PHSearch'
        />
      </div>
    </>
  )
}
