
import './App.css'
// import APIData from './API'
// import AddTeaOrder from './AddTeaOrder'
import AppRoutes from './Routes/AppRoutes'
import NavBar from './NavBar'
import Logo from './Logo'
import ThemesButton from './ThemesButton'
import './ThemesButtonPlacement.css'
import SimpleContainer from './testcontainer'

function App() {

  return (
    <>
    <div className="top-left-button">
    {/* <ThemesButton></ThemesButton> */}
    </div>
    <div className="app-container">
    <Logo></Logo>
      <NavBar></NavBar>
      <div className="content-container">
        {/* <SimpleForm></SimpleForm> */}
      <AppRoutes></AppRoutes>
      {/* <SimpleContainer></SimpleContainer> */}
      {/* <RandomCharacter></RandomCharacter> */}
      {/* <RowAndColumnSpacing></RowAndColumnSpacing> */}
      </div>
    </div>

    </>
  )
}

export default App
