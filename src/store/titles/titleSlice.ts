import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FavoriteTitle } from '../../types/types'

interface Title {
  favorites: { [key: string]: FavoriteTitle }
}

const getFavoriteKey = (favorite: FavoriteTitle) =>
  `${favorite.media_type}:${favorite.id}`

const normalizeFavorites = (favorites: { [key: string]: FavoriteTitle }) =>
  Object.values(favorites).reduce<{ [key: string]: FavoriteTitle }>(
    (normalized, favorite) => {
      normalized[getFavoriteKey(favorite)] = favorite
      return normalized
    },
    {}
  )

const initialState: Title = {
  favorites: {},
}

export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteTitle>) => {
      const favorite = action.payload

      const key = getFavoriteKey(favorite)
      if (state.favorites[key]) {
        delete state.favorites[key]
      } else {
        state.favorites[key] = favorite
      }

      localStorage.setItem('favorite-title', JSON.stringify(state.favorites))
    },

    setFavoritesTitles(
      state,
      action: PayloadAction<{ [key: string]: FavoriteTitle }>
    ) {
      state.favorites = normalizeFavorites(action.payload)
      localStorage.setItem('favorite-title', JSON.stringify(state.favorites))
    },
  },
})

export const { toggleFavorite, setFavoritesTitles } = titleSlice.actions
