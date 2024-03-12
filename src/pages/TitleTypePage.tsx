import { useParams } from 'react-router-dom'
import { CardTypeComponent } from '../components'
import { usePageInfo } from '../hooks/usePageInfo'


//BORRAR

export const TitleTypePage = () => {
  const { typeMedia } = useParams()

  const { pageInfo, searchType } = usePageInfo(typeMedia)

  let cardComponents

  if (typeMedia === 'tendency') {
    cardComponents = (
      <>
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='all'
          image='All'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='movie'
          image='Movie'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='tv'
          image='Tv'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='person'
          image='Person'
        />
      </>
    )
  } else if (typeMedia === 'movie') {
    cardComponents = (
      <>
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='now_playing'
          image='NowPlaying'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='upcoming'
          image='Upcoming'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='top_rated'
          image='TopRated'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
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
          link='airing_today'
          image='AiringToday'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='on_the_air'
          image='OnTheAir'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='top_rated'
          image='TopRated'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
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
          link='multi'
          image='All'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='movie'
          image='Movie'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
          link='tv'
          image='Tv'
        />
        <CardTypeComponent
          titleTypeInfo={searchType}
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
