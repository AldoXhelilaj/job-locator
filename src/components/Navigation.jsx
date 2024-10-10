import { NavLink } from "react-router-dom";
import './Navigation.css';
import {useAuth} from "../auth";

const Navigation = () => {
    const { currentUser, logout } = useAuth();



    return (
        <nav>
            <ul className="navigation">
                {currentUser && <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/">Home</NavLink></li>}
               {!currentUser && <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/login">Login</NavLink></li>}
                {!currentUser && <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/signup">Sign up</NavLink></li>}
                {currentUser && <li style={{marginLeft: "auto"}}><button onClick={logout}>Logout</button></li>}
            </ul>
        </nav>
    );
};

export default Navigation;