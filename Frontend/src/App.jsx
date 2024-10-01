import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarEvidencija from './components/NavBarEvidencija'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './Constants'
import Pocetna from './pages/Pocetna'
import ProjektiPregled from './pages/projekti/ProjektiPregled'
import ProjektiDodaj from './pages/projekti/ProjektiDodaj'
import ProjektiPromjena from './pages/projekti/ProjektiPromjena'
import DjelatniciPregled from './pages/djelatnici/DjelatniciPregled'
import DjelatniciDodaj from './pages/djelatnici/DjelatniciDodaj'
import DjelatniciPromjena from './pages/djelatnici/DjeltniciPromjena'

function App() {

  return (
    <>
      <NavBarEvidencija />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna/>} />

        <Route path={RoutesNames.PROJEKT_PREGLED} element={<ProjektiPregled />} />
        <Route path={RoutesNames.PROJEKT_NOVI} element={<ProjektiDodaj />} />
        <Route path={RoutesNames.PROJEKT_PROMJENA} element={<ProjektiPromjena />} />        

        <Route path={RoutesNames.DJELATNIK_PREGLED} element={<DjelatniciPregled />} />
        <Route path={RoutesNames.DJELATNIK_NOVI} element={<DjelatniciDodaj />} />
        <Route path={RoutesNames.DJELATNIK_PROMJENA} element={<DjelatniciPromjena />} />
      </Routes>
    </>
  )
}

export default App
