export const useTypeSearch = (typeSearch?: string) => {
  if (typeSearch === 'airing_today') {
    return { pageTitle: 'En Tv Hoy' }
  } else if (typeSearch === 'on_the_air') {
    return { pageTitle: 'En Tv Ahora' }
  } else if (typeSearch === 'top_rated') {
    return { pageTitle: 'Mejor Valorados' }
  } else if (typeSearch === 'popular') {
    return { pageTitle: 'Mas Populares' }
  } else if (typeSearch === 'now_playing') {
    return { pageTitle: 'En El Cine' }
  } else if (typeSearch === 'upcoming') {
    return { pageTitle: 'Proximos Estrenos' }
  }
  return { pageTitle: '' }
}
