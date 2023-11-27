export const usePageInfo = (typeMedia?: string) => {
  if (typeMedia === 'movie') {
    return { pageInfo: 'Peliculas', searchType: 'movie' }
  } else if (typeMedia === 'tv') {
    return { pageInfo: 'Series', searchType: 'tv' }
  } else if (typeMedia === 'people') {
    return { pageInfo: 'Personas', searchType: 'people' }
  } else if (typeMedia === 'all') {
    return { pageInfo: 'Todo', searchType: 'all' }
  } else if (typeMedia === 'tendency') {
    return { pageInfo: 'Tendencias', searchType: 'tendency' }
  } else if (typeMedia === 'search') {
    return { pageInfo: 'Buscar', searchType: 'search' }
  }
  return { pageInfo: '', searchType: '' }
}
