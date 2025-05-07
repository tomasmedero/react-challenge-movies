import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { TitleCard } from "../components/TitleCard"
import { TitleInfo } from "../types/types"

export const FavoritesPage = () => {
    const favs = useSelector((state: RootState) => Object.values(state.title.favorites))
    
    // Convertir los favoritos al formato TitleInfo para usar con TitleCard
    const favoriteTitles: TitleInfo[] = favs.map(fav => {
        return {
            id: parseInt(fav.id),
            name: fav.name,
            originalName: fav.name, // Usar el mismo nombre como originalName
            description: fav.description,
            posterUrl: fav.posterUrl,
            releaseDay: fav.releaseDay,
            rating: fav.rating,
            media_type: fav.media_type,
            programType: fav.programType
        };
    });
    
    console.log("TitleInfo generados:", favoriteTitles);

    return (
        <div className="container mx-auto pt-8">
            <h2 className='text-4xl font-extrabold text-center dark:text-white mt-5 ml-3 mb-5'>
                Mis Favoritos
            </h2>
            
            {favoriteTitles.length === 0 ? (
                <div className="text-center text-gray-500 my-10">
                    No has añadido ningún título a tus favoritos
                </div>
            ) : (
                <TitleCard titles={favoriteTitles} />
            )}
        </div>
    )
}
