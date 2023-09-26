import { useLocation } from 'react-router-dom'
import { ChallengeComponent, InfoBar, Navbar } from '../components'
import { useEffect, useState } from 'react'

export const ChallengePage = () => {
  const [info, setInfo] = useState<string>('Titles')
  const location = useLocation()

  useEffect(() => {
    let pageInfo: string = 'Titulos'
    if (location.pathname === '/series') {
      pageInfo = 'Series'
    } else if (location.pathname === '/peliculas') {
      pageInfo = 'Peliculas'
    } else if (location.pathname === '/') {
      pageInfo = 'Titulos'
    }
    setInfo(pageInfo)
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <InfoBar pageInfo={info} />
      <ChallengeComponent />
    </>
  )
}

//TODO
// Crear un componente donde cuando toques el movie o serie te traiga la info
//Agregar un buscador
// En el componente de la movie o serie que tenga una parte de comentarios y solo te deje comentar si esta logueado
