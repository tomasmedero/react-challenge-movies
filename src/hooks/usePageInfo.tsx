export const usePageInfo = (typeMedia?: string) => {
  if (typeMedia === 'movie') {
    return { pageInfo: 'Peliculas', searchType: 'movie' }
  } else if (typeMedia === 'tv') {
    return { pageInfo: 'Series', searchType: 'tv' }
  } else if (typeMedia === 'person') {
    return { pageInfo: 'Personas', searchType: 'person' }
  } else if (typeMedia === 'all') {
    return { pageInfo: 'Todo', searchType: 'all' }
  }
  else if (typeMedia === 'tendency') {
    return { pageInfo: 'Tendencias', searchType: 'tendency' }
  }
  // else if (typeMedia === 'search') {
  //   return { pageInfo: 'Buscar', searchType: 'search' }
  // } 
  else if (typeMedia === 'multi') {
    return { pageInfo: 'Todos', searchType: 'multi' }
  }
  return { pageInfo: '', searchType: '' }
}
