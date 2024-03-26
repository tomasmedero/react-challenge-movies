import { useState } from "react";

export const Pagination = () => {

    const [activePage, setActivePage] = useState(1);

    const handlePageClick = (pageNumber: number) => {
        setActivePage(pageNumber);

    }

    return (
        <>

            <nav aria-label="Page navigation" className="flex items-center justify-center mt-4">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Anterior
                        </a>
                    </li>
                    {[1, 2, 3, 4, 5].map((pageNumber) => (
                        <li key={pageNumber}>
                            <button
                                className={`flex items-center justify-center px-3 h-8 leading-tight ${pageNumber === activePage
                                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                                    : 'text-gray-500 border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700'
                                    }`}
                                onClick={() => handlePageClick(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Siguiente
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};