import { useEffect, useState } from "react";
import { getAPITrending } from "../helpers";
import { TitleInfo } from "../types/types";
import { Link } from "react-router-dom";

interface CarouselProps {
    searchType: string
    title: string
    className?: string
}

export const CarouselComponent: React.FC<CarouselProps> = ({ searchType, title, className }) => {

    const [titles, setTitles] = useState<TitleInfo[]>([])



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
    }, [searchType])



    return (
        <>
            <div className={className}>
                <h2 className="text-2xl font-bold mb-4 ">{title}</h2>
                <div className="flex overflow-x-auto space-x-4 p-4 border border-gray-300 rounded-md shadow-md">
                    {titles.map(({ id, posterUrl, name, rating, programType, media_type, releaseDay }) => (
                        <div key={id} className="flex-shrink-0 w-48 min-w-[200px]">
                            <Link to={`/card/${media_type}/${id}`}>
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
                                <p className="text-center mt-2 line-clamp-1">{name}</p>
                                <div className='text-base text-gray-400 text-center '>
                                    {programType && (
                                        <p>
                                            {programType.charAt(0).toUpperCase() +
                                                programType.slice(1)}
                                        </p>
                                    )}
                                </div>
                                <div className='text-base text-gray-400 text-center '>
                                    {releaseDay && (
                                        <p>
                                            {releaseDay}
                                        </p>
                                    )}
                                </div>
                            </Link >

                        </div>
                    ))}
                </div>
            </div>
        </>
    );





}
