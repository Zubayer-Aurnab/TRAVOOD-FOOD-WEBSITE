
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './component/NavBar'
import Footer from './component/Footer'

function App() {


  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
