import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FavoriteTitle } from '../../types/types'

interface Title {
  favorites: { [key: string]: FavoriteTitle }
}

const initialState: Title = {
  favorites: {},
}

export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteTitle>) => {
      const favorite = action.payload

      const { id } = favorite
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!state.favorites[id]) {
        delete state.favorites[id]
      } else {
        state.favorites[id] = favorite
      }

      localStorage.setItem('favorite-title', JSON.stringify(state.favorites))
    },

    setFavoritesTitles(
      state,
      action: PayloadAction<{ [key: string]: FavoriteTitle }>
    ) {
      state.favorites = action.payload
    },
  },
})

export const { toggleFavorite, setFavoritesTitles } = titleSlice.actions
