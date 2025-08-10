import { NavLink } from "react-router-dom";


type NavDropdownOption = {
    optionlink: string;
    title: string;
};



export const NavOptions = ({ title, optionlink }: NavDropdownOption) => {

    return (
        <li>
            <NavLink
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 dark:text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent text-sm sm:text-base'
                to={`/${optionlink}`}
            >
                {title}
            </NavLink>
        </li>





    )
}