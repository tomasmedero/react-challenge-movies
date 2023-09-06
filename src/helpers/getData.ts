import { datas } from '../data/datas'
import { TitleInfo } from '../types/types'

export const getData = (titletype: string): TitleInfo[] => {
  return datas.filter(
    (data: TitleInfo) =>
      data.programType === titletype && data.releaseYear >= 2010
  )
}
