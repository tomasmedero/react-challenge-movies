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
}

export interface TitleCardProps {
  titles: TitleInfo[]
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
