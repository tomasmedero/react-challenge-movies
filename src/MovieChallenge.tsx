import { Provider } from 'react-redux'
import { AppRouter } from './routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import { useEffect } from 'react'
import { setFavoritesTitles } from './store/titles/titleSlice'

export const MovieChallenge = () => {
  useEffect(() => {
    try {
      const favoritesJson = localStorage.getItem('favorite-title');    
      const favorites = JSON.parse(favoritesJson ?? '{}');
      store.dispatch(setFavoritesTitles(favorites));
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      // Si hay error, inicializar con objeto vacío
      store.dispatch(setFavoritesTitles({}));
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
