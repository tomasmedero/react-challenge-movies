import { SearchData, TitleInfo } from '../types/types'

type Props = {
  searchQuery: string
}

export const getAPISearch = async (props: Props): Promise<TitleInfo[]> => {
  const { searchQuery } = props

  const url = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=true&language=es-ES&page=1`

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

  const searchData: TitleInfo[] = data.results
    .filter((search: SearchData) => search.media_type !== 'person')
    .map((search: SearchData) => {
      let name, originalName, releaseDay, programType, rating, posterUrl

      const { id, overview: description, media_type } = search

      function formatDate(dateString: string): string {
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

      if (media_type === 'movie') {
        name = search.title
        originalName = search.original_title
        releaseDay = search.release_date && formatDate(search.release_date)
        programType = 'Película'
        rating = search.vote_average.toFixed(1)
        posterUrl = search.poster_path
          ? `https://image.tmdb.org/t/p/w500/${search.poster_path}`
          : '/posterWhite.jpg'
      } else if (media_type === 'tv') {
        name = search.name
        originalName = search.original_name
        releaseDay = search.first_air_date && formatDate(search.first_air_date)
        programType = 'Serie Tv'
        rating = search.vote_average.toFixed(1)
        posterUrl = search.poster_path
          ? `https://image.tmdb.org/t/p/w500/${search.poster_path}`
          : '/posterWhite.jpg'
      } else if (media_type === 'person') {
        // name = search.name
        // originalName = search.original_name
        // programType = 'Persona'
        // posterUrl = search.profile_path
        //   ? `https://image.tmdb.org/t/p/w500${search.profile_path}`
        //   : '/posterWhite.jpg'
        null
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

  return searchData
}
