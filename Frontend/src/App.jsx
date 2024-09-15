
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarEvidencija from './components/NavBarEvidencija'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './Constants'
import Pocetna from './pages/Pocetna'
import ProjektiPregled from './pages/projekti/ProjektiPregled'


function App() {
  
  

  return (
    <>
      <NavBarEvidencija />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.PROJEKT_PREGLED} element={<ProjektiPregled />} />
      </Routes>
    </>
  )
}

export default App
