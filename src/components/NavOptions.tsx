import { NavLink } from "react-router-dom";


type NavDropdownOption = {
    optionlink: string;
    title: string;
};



export const NavOptions = ({ title, optionlink }: NavDropdownOption) => {

    return (
        <li>
            <NavLink
                className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm font-medium transition md:px-0 ${isActive ? 'text-cyan-400' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 md:text-slate-300 md:hover:bg-transparent md:hover:text-white'}`}
                to={`/${optionlink}`}
            >
                {title}
            </NavLink>
        </li>





    )
}
