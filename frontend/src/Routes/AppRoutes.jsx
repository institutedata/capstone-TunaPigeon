import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import CharacterList from '../Pages/Characters';
import Quiz from '../Pages/Quiz';
import JasmineDragon from '../Pages/JasmineDragon';
function AppRoutes(props) {
    return(
        <Routes>
            {/* index matches on default/home URL: */}
            <Route index element={<Home {...props}/>} />
            <Route path="/characters" element={<CharacterList {...props}/>} />
            <Route path="/quiz" element={<Quiz {...props}/>} />
            <Route path="/jasminedragon" element={<JasmineDragon {...props} />}/>

        </Routes>
    )
}

export default AppRoutes;