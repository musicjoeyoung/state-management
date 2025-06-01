import { NavLink } from "react-router-dom";
import "../App.css"

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/">Users</NavLink>
            <NavLink to="/create">Create User</NavLink>
        </nav>
    )
}

export default Navbar
