import { AppRouter } from './routes/AppRouter'
import { BrowserRouter } from 'react-router-dom'

export const MovieChallenge = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
