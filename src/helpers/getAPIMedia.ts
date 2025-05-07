import { SearchData, TitleInfo } from '../types/types'

type Props = {
  typeSearch?: string
  typeMedia?: string
}

// Función para formatear la fecha
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const [year, month, day] = dateString.split('-');
  // Convertir el día a número sin ceros a la izquierda
  const dayNumber = parseInt(day, 10);
  
  // Array de nombres de meses en español
  const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];
  
  // Restar 1 porque los meses en JavaScript van de 0 a 11
  const monthName = monthNames[parseInt(month, 10) - 1];
  
  return `${dayNumber} ${monthName} ${year}`;
}

// now_playing, popular, top_rated, upcoming
export const getAPIMedia = async (props: Props): Promise<TitleInfo[]> => {
  const { typeSearch, typeMedia } = props

  const url = `https://api.themoviedb.org/3/${typeMedia}/${typeSearch}?language=es-ES&page=1'`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ',
    },
  }

  const res = await fetch(url, options)

  const data = await res.json()

  const mediaData: TitleInfo[] = data.results.map((media: SearchData) => {
    let name,
      originalName,
      releaseDay,
      programType,
      rating,
      posterUrl,
      media_type

    const { id, overview: description } = media

    if (typeMedia === 'movie') {
      name = media.title
      originalName = media.original_title
      releaseDay = media.release_date ? formatDate(media.release_date) : ''
      programType = 'Pelicula'
      media_type = 'movie'
      rating = media.vote_average.toFixed(1)
      posterUrl = media.poster_path
        ? `https://image.tmdb.org/t/p/w500/${media.poster_path}`
        : '/posterWhite.jpg'
    } else if (typeMedia === 'tv') {
      name = media.name
      originalName = media.original_name
      releaseDay = media.first_air_date ? formatDate(media.first_air_date) : ''
      programType = 'Serie Tv'
      media_type = 'tv'
      rating = media.vote_average.toFixed(1)
      posterUrl = media.poster_path
        ? `https://image.tmdb.org/t/p/w500/${media.poster_path}`
        : '/posterWhite.jpg'
    }

    return {
      id,
      name,
      originalName,
      description,
      programType,
      posterUrl,
      releaseDay,
      rating,
      media_type,
    }
  })
  return mediaData
}
