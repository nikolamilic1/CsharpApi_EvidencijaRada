
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarEvidencija from './components/NavBarEvidencija'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './Constants'
import Pocetna from './pages/Pocetna'


function App() {
  
  

  return (
    <>
      <NavBarEvidencija />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />
      </Routes>
    </>
  )
}

export default App
