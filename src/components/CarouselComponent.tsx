import { useEffect, useState } from "react";
import { getAPITrending } from "../helpers";
import { TitleInfo } from "../types/types";

export const CarouselComponent: React.FC = () => {

    const [titles, setTitles] = useState<TitleInfo[]>([])

    const searchType = 'all'

    useEffect(() => {
        async function fetchTitles() {
            try {
                const data = await getAPITrending({ searchType })
                setTitles(data)
            } catch (error) {
                console.error('Error fetching movie name:', error)
            }
        }

        fetchTitles()
    }, [])



    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Todas las Tendencias</h2>
            <div className="flex overflow-x-auto space-x-4 p-4 border border-gray-300 rounded-md shadow-md">
                {titles.map((title) => (
                    <div key={title.id} className="flex-shrink-0" style={{ minWidth: '200px' }}>
                        <img src={title.posterUrl} alt={title.name} className="w-48 h-64 object-cover" />
                        <p className="text-center mt-2">{title.name}</p>
                        <div className='text-base text-gray-400 text-center '>
                            {title.programType && (
                                <p>
                                    {title.programType.charAt(0).toUpperCase() +
                                        title.programType.slice(1)}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );





}
