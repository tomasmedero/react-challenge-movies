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
                {titles.map(({ id, posterUrl, name, rating, programType }) => (
                    <div key={id} className="flex-shrink-0 w-48 min-w-[200px]">
                        <div className="relative" style={{ height: '300px' }}>
                            <img
                                src={posterUrl}
                                alt={name}
                                className="w-full h-full object-cover rounded-md"
                            />
                            {rating && (
                                <div className='absolute top-2 right-2 bg-green-300 font-bold rounded-xl p-1'>
                                    {rating}
                                </div>
                            )}
                        </div>
                        <p className="text-center mt-2">{name}</p>
                        <div className='text-base text-gray-400 text-center '>
                            {programType && (
                                <p>
                                    {programType.charAt(0).toUpperCase() +
                                        programType.slice(1)}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );





}
