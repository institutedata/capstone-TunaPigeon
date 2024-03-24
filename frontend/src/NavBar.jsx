import { NavLink } from "react-router-dom";
import "./NavBar.css"

export default function NavBar(){
    return (
        <nav className="NavBar" >
            <ul className="menu">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/characters">Characters</NavLink></li>
            <li><NavLink to="/quiz">Quiz</NavLink></li>
            <li><NavLink to="/jasminedragon">Jasmine Dragon Teashop</NavLink></li>
            </ul>
        </nav>
    )
}