export const usePageInfo = (path: string) => {
  if (path.startsWith('/movie')) {
    return { pageInfo: 'Peliculas', searchType: 'movie' }
  } else if (path.startsWith('/tv')) {
    return { pageInfo: 'Series', searchType: 'tv' }
  }
  return { pageInfo: '', searchType: '' }
}
