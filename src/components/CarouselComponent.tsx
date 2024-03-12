
const data = [
    { id: 1, name: 'Card 1', imageUrl: 'moviemovie.jpg' },
    { id: 2, name: 'Card 2', imageUrl: 'movieNowPlaying.jpg' },
    { id: 3, name: 'Card 3', imageUrl: 'moviePopular.jpg' },
    { id: 4, name: 'Card 4', imageUrl: 'searchMovie.jpg' },
    { id: 5, name: 'Card 5', imageUrl: 'tendencyAll.jpg' },
    { id: 6, name: 'Card 6', imageUrl: 'tvtv.jpg' },
    { id: 7, name: 'Card 7', imageUrl: 'tendency.jpg' },


];


export const CarouselComponent: React.FC = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Tendencias</h2>
            <div className="flex overflow-x-auto space-x-4 p-4 border border-gray-300 rounded-md shadow-md">
                {data.map((card) => (
                    <div key={card.id} className="flex-shrink-0" style={{ minWidth: '200px' }}>
                        <img src={card.imageUrl} alt={card.name} className="w-48 h-64 object-cover" />
                        <p className="text-center mt-2">{card.name}</p>
                    </div>
                ))}
            </div>
        </>
    );





}
