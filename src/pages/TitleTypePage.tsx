import { useParams } from 'react-router-dom'
import { CardTypeComponent } from '../components'
import { usePageInfo } from '../hooks/usePageInfo'

export const TitleTypePage = () => {
  const { typeMedia } = useParams()

  const { pageInfo, searchType } = usePageInfo(typeMedia)

  let cardComponents

  if (typeMedia === 'tendency') {
    cardComponents = (
      <>
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Todos'
          link='all'
          image='All'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Peliculas'
          link='movie'
          image='Movie'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Series'
          link='tv'
          image='Tv'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Personas'
          link='people'
          image='People'
        />
      </>
    )
  } else if (typeMedia === 'movie') {
    cardComponents = (
      <>
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='En el Cine'
          link='now_playing'
          image='NowPlaying'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Proximos Estrenos'
          link='upcoming'
          image='Upcoming'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Mejores votados'
          link='top_rated'
          image='TopRated'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Más populares'
          link='popular'
          image='Popular'
        />
      </>
    )
  } else if (typeMedia === 'tv') {
    cardComponents = (
      <>
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='En TV Hoy'
          link='airing_today'
          image='AiringToday'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='En TV Ahora'
          link='on_the_air'
          image='OnTheAir'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Mejor votados'
          link='top_rated'
          image='TopRated'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Mas Populares'
          link='popular'
          image='Popular'
        />
      </>
    )
  } else if (typeMedia === 'search') {
    cardComponents = (
      <>
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Buscar Todos'
          link='all'
          image='All'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Buscar Peliculas'
          link='movie'
          image='Movie'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Buscar Series'
          link='tv'
          image='Tv'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          pageInfo='Buscar Personas'
          link='person'
          image='Person'
        />
      </>
    )
  }

  return (
    <>
      <h2 className='text-4xl font-extrabold text-center dark:text-white mt-5 ml-3'>
        {pageInfo}
      </h2>
      <div className='flex flex-wrap justify-left mt-5 ml-3'>
        {cardComponents}
      </div>
    </>
  )
}
