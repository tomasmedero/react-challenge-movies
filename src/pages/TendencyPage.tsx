import { CardTypeComponent } from '../components'

export const TendencyPage = () => {
  return (
    <>
      <div className='flex flex-wrap justify-left mt-5 ml-3'>
        <CardTypeComponent
          titleTypeInfo='tendency'
          pageInfo='Todos'
          link='all'
          image='Otros'
        />
        <CardTypeComponent
          titleTypeInfo='tendency'
          pageInfo='Películas'
          link='movie'
          image='Otros'
        />
        <CardTypeComponent
          titleTypeInfo='tendency'
          pageInfo='Series'
          link='tv'
          image='Otros'
        />
        <CardTypeComponent
          titleTypeInfo='tendency'
          pageInfo='Personas'
          link='people'
          image='Otros'
        />
      </div>
    </>
  )
}
