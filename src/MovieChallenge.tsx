import { Provider } from 'react-redux'
import { AppRouter } from './routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'

export const MovieChallenge = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
