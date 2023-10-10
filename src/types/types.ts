export interface InfoBarProps {
  pageInfo: string
}

export interface TitleInfo {
  id: number
  name: string
  originalName: string
  description: string
  programType?: string
  posterUrl: string
  releaseDay: number
  rating: number
  episodes?: number
  seasons?: number
  runtime?: number
  genres?: GenresProps[]
  watchProviderFlatrate?: FlatRateProps[]
  watchProviderLink?: string
}

export interface TitleCardProps {
  titles: TitleInfo[]
}

export interface GenresProps {
  id: number
  name: string
}

export interface FlatRateProps {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface IdCardProps {
  title?: TitleInfo
}

export interface User {
  status: 'chequeando' | 'autenticado' | 'no-autenticado'
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  errorMessage: string | null
}
