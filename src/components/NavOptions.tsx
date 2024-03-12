import { NavLink } from "react-router-dom";


type NavDropdownOption = {
    optionlink: string;
    title: string;
};



export const NavOptions = ({ title, optionlink }: NavDropdownOption) => {

    return (
        <li>
            <NavLink
                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                to={`/${optionlink}`}
            >
                {title}
            </NavLink>
        </li>





    )
}