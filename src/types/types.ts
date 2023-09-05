export interface InfoBarProps {
  pageInfo: string
}

export interface TitleInfo {
  id: number
  title: string
  description: string
  programType: string
  url: string
  releaseYear: number
}

export interface User {
  status: 'chequeando' | 'autenticado' | 'no-autenticado'
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  errorMessage: string | null
}
