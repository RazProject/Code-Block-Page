import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/lobby">Lobby</NavLink>
            <span> | </span>
			<NavLink to="/code-block-page">Code block page</NavLink>
        </div>
    );
}

export default Menu;
