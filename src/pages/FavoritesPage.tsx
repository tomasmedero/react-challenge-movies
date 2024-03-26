import { useSelector } from "react-redux"
import { RootState } from "../store/store"

export const FavoritesPage = () => {


    const favs = useSelector((state: RootState) => Object.values(state.title.favorites))

    return (
        <>
            {favs.map(({ id, name }) => (

                <div key={id}>{name}</div>
            ))}
        </>



        // {favoritePokemons.length === 0 ? <NoFavorites /> : <PokemonGrid pokemons={favoritePokemons} />}


    )
}
