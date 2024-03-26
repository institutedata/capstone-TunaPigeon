// import { NavLink } from "react-router-dom";
// import "./NavBar.css"

// export default function NavBar(){
//     return (
//         <nav className="NavBar" >
//             <ul className="menu">
//             <li><NavLink to="/">Home</NavLink></li>
//             <li><NavLink to="/characters">Characters</NavLink></li>
//             <li><NavLink to="/quiz">Quiz</NavLink></li>
//             <li><NavLink to="/jasminedragon">Jasmine Dragon Teashop</NavLink></li>
//             </ul>
//         </nav>
//     )
// }

import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import "./NavBar.css"
import { ThemeProvider } from "@emotion/react";
import { blackTheme } from "./themes/blackTheme";


export default function NavBar() {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <nav className="NavBar" >
             <ThemeProvider theme={blackTheme}>
            <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label="Home" component={Link} to="/" />
                <Tab label="Characters" component={Link} to="/characters" />
                <Tab label="Quiz" component={Link} to="/quiz" />
                <Tab label="Jasmine Dragon" component={Link} to="/jasminedragon" />
            </Tabs>
            </ThemeProvider>
        </nav>
    );
}