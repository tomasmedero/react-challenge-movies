import { TitleCardProps } from '../types/types'

export const getTitleById = ({
  id,
  titles,
}: {
  id: number
  titles: TitleCardProps
}) => {
  // Verificar que 'titles' sea un array antes de usar 'find'
  if (Array.isArray(titles.titles)) {
    return titles.titles.find((title) => title.id === id)
  }
  // Si 'titles' no es un array, puedes manejar el caso de error aquí
  return null // O puedes lanzar un error, según tus necesidades
}
