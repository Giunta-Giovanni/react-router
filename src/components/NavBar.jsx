import { NavLink } from "react-router-dom"
export default function NavBar() {
    return (
        <nav>
            <ul>
                <li className="page-link">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="page-link">
                    <NavLink to="/about">Chi Siamo</NavLink>
                </li>
                <li className="page-link">
                    <NavLink to="/posts">Posts</NavLink>
                </li>
            </ul>
        </nav>

    )
}