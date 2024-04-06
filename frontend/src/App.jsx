
import './App.css'
import AppRoutes from './Routes/AppRoutes'
import NavBar from './Components/NavBar'
import Logo from './Components/Logo'

function App() {

  return (
    <>
    <div className="top-left-button">
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
