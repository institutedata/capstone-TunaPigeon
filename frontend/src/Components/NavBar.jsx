import { useState, useEffect} from "react";
import { Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import "./NavBar.css"
import { ThemeProvider } from "@emotion/react";
import { blackTheme } from "../themes/blackTheme";


export default function NavBar() {
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        // Retrieve selected tab from local storage
        const storedTab = localStorage.getItem("selectedTab");
        if (storedTab !== null) {
          setSelectedTab(parseInt(storedTab));
        }
      }, []); // Run only once when component mounts

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
         // Store selected tab in local storage
    localStorage.setItem("selectedTab", newValue);
    };

    return (
        <nav className="NavBar" >
             <ThemeProvider theme={blackTheme}>
            <Tabs value={selectedTab} onChange={handleChange} indicatorColor="transparent">
                <Tab label="Home" component={Link} to="/" sx={{ fontSize: "15px" }}/>
                <Tab label="Characters" component={Link} to="/characters" sx={{ fontSize: "15px" }}/>
                <Tab label="Quiz" component={Link} to="/quiz" sx={{ fontSize: "15px" }}/>
                <Tab label="Jasmine Dragon" component={Link} to="/jasminedragon" sx={{ fontSize: "15px" }} />
            </Tabs>
            </ThemeProvider>
        </nav>
    );
}