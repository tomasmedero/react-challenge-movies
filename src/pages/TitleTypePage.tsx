import { useParams } from 'react-router-dom'
import { CardTypeComponent } from '../components'
import { usePageInfo } from '../hooks/usePageInfo'

const movieCategories = [
  { link: 'now_playing', title: 'En el cine', description: 'Los estrenos que podés ver ahora.' },
  { link: 'upcoming', title: 'Próximos estrenos', description: 'Lo que llega muy pronto a la pantalla.' },
  { link: 'top_rated', title: 'Mejor valoradas', description: 'Las favoritas del público y la crítica.' },
  { link: 'popular', title: 'Más populares', description: 'Las películas que todos están mirando.' },
]

const tvCategories = [
  { link: 'airing_today', title: 'En TV hoy', description: 'Episodios que se emiten durante el día.' },
  { link: 'on_the_air', title: 'Al aire', description: 'Series con episodios actualmente en emisión.' },
  { link: 'top_rated', title: 'Mejor valoradas', description: 'Las series con mejores puntuaciones.' },
  { link: 'popular', title: 'Más populares', description: 'Las series más vistas del momento.' },
]

export const TitleTypePage = () => {
  const { typeMedia } = useParams()
  const { pageInfo, searchType } = usePageInfo(typeMedia)
  const categories = typeMedia === 'movie' ? movieCategories : tvCategories

  return (
    <main className='min-h-[calc(100vh-4rem)] bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <p className='text-sm font-bold uppercase tracking-[0.2em] text-cyan-400'>Explorar catálogo</p>
        <h1 className='mt-2 text-4xl font-black tracking-tight sm:text-5xl'>{pageInfo}</h1>
        <p className='mt-4 max-w-2xl text-slate-400'>Elegí una colección para descubrir nuevos títulos.</p>

        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {categories.map((category) => (
            <CardTypeComponent
              key={category.link}
              titleTypeInfo={searchType}
              link={category.link}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
