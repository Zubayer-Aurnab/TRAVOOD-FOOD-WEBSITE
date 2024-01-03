
import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './component/NavBar'
import Footer from './component/Footer'
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
