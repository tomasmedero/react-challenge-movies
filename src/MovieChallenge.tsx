import { Provider } from 'react-redux'
import { AppRouter } from './routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import { useEffect } from 'react'
import { setFavoritesTitles } from './store/titles/titleSlice'

export const MovieChallenge = () => {

  useEffect(() => {


    const favorites = JSON.parse(localStorage.getItem('favorite-title') ?? '{}')

    store.dispatch(setFavoritesTitles(favorites))
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
