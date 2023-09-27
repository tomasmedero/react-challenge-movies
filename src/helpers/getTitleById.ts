//API eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ

import { TitleInfo } from '../types/types'

export const getTitleById = async (
  id: number,
  titleTypeInfo: string
): Promise<TitleInfo | null> => {
  const url = `https://api.themoviedb.org/3/${titleTypeInfo}/${id}?language=en-US`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWVmZWE5YmY0ZDE2YTI4MjUyM2MzN2IzMGNiNTY0MyIsInN1YiI6IjY0ZjdkMzFkNGNjYzUwMDEzODhkMTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-99PXOZw4FE5uFD613iE26WD81LEeycSyirgNJ99OQ',
    },
  }

  try {
    const res = await fetch(url, options)
    const data = await res.json()

    const id = data.id

    const description = data.overview

    let releaseDay
    let name
    let originalName

    if (titleTypeInfo === 'tv') {
      releaseDay = data.first_air_date
      name = data.name
      originalName = data.original_name
    } else if (titleTypeInfo === 'movie') {
      releaseDay = data.release_date
      name = data.title
      originalName = data.original_title
    }
    const posterUrl = data.poster_path
    const year = parseInt(releaseDay.split('-')[0])

    const rating = parseFloat(data.vote_average.toFixed(1))

    const titleRes: TitleInfo = {
      id: id,
      name: name,
      originalName: originalName,
      description: description,
      posterUrl: posterUrl,
      releaseDay: year,
      rating: rating,
    }

    return titleRes
  } catch (error) {
    console.error('Error fetching the data:', error)
    return null // Devuelve null en caso de error
  }
}
