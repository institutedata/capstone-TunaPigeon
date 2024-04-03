
import './App.css'
// import APIData from './API'
// import AddTeaOrder from './AddTeaOrder'
import AppRoutes from './Routes/AppRoutes'
import NavBar from './Components/NavBar'
import Logo from './Logo'
import ThemesButton from './ThemesButton'
import './ThemesButtonPlacement.css'

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
      <AppRoutes></AppRoutes>
      </div>
    </div>

    </>
  )
}

export default App
