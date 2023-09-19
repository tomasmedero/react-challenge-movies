export interface InfoBarProps {
  pageInfo: string
}

export interface SeriesInfo {
  id: number
  name: string
  originalName: string
  description: string
  programType: string
  posterUrl: string
  releaseDay: number
}

export interface MovieInfo {
  id: number
  title: string
  originalTitle: string
  description: string
  programType: string
  posterUrl: string
  releaseDay: number
}

export interface User {
  status: 'chequeando' | 'autenticado' | 'no-autenticado'
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  errorMessage: string | null
}
