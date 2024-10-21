import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjektService from "../../services/ProjektService";
import { RoutesNames } from "../../Constants";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Service from '../../services/ZadatakService';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import DjelatnikService from "../../services/DjelatnikService";
import { FaTrash } from "react-icons/fa";




export default function ZadaciPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();

    const [projekt, setProjekt] = useState([]);
    const [projektSifra, setProjektSifra] = useState(0);
    const [djelatnik, setDjelatnici] = useState([]);
    const [pronadeniDjelatnici, setPronadeniDjelatnici] = useState([]);

    const [zadatak, setZadatak] = useState({});

    const typeaheadRef = useRef(null);

    async function dohvatiProjekt() {
        const odgovor = await ProjektService.get();
        setProjekt(odgovor);
    }    

    async function dohvatiZadatak() {
        const odgovor = await Service.getBySifra(routeParams.sifra);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    let zadatak = odgovor.poruka;
    setZadatak(zadatak);
    setProjektSifra(zadatak.projektSifra); 
    }

    async function dohvatiDjelatnici() {
      const odgovor = await Service.getDjelatnici(routeParams.sifra);
      if(odgovor.greska){
        alert(odgovor.poruka);
        return;
      }
      setDjelatnici(odgovor.poruka);
    }

    async function traziDjelatnik(uvjet) {
      const odgovor = await DjelatnikService.traziDjelatnik(uvjet);
      if(odgovor.greska){
        alert(odgovor.poruka);
        return;
      }
      setPronadeniDjelatnici(odgovor.poruka);
    }

    async function dodajDjelatnika(e) {
      const odgovor = await Service.dodajDjelatnika(routeParams.sifra, e[0].sifra);
      if(odgovor.greska){
        alert(odgovor.podaci);
        return;
      }
      await dohvatiDjelatnici();
      typeaheadRef.current.clear();
    }
    
    async function obrisiDjelatnika(djelatnik) {
      const odgovor = await Service.obrisiDjelatnika(routeParams.sifra, djelatnik);
      if(odgovor.greska){
        alert(odgovor.podaci);
        return;
      }
      await dohvatiDjelatnici();
    }

    async function dohvatiInicijalnePodatke() {
        await dohvatiProjekt();
        await dohvatiZadatak();
        await dohvatiDjelatnici();        
    }


    useEffect(()=>{
        dohvatiInicijalnePodatke();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

      async function promjena(e) {
        const odgovor = await Service.promjena(routeParams.sifra,e);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    navigate(RoutesNames.ZADATAK_PREGLED);
      }

      function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

    promjena({
      naziv: podaci.get('naziv'),     
      pocetak: podaci.get('pocetak'),
      zavrsetak: podaci.get('zavrsetak'),
      projektSifra: parseInt(projektSifra),
      opis: podaci.get('opis')
    });        
  }

  return (
  <Container>
    Mjenjanje podataka zadatka
    <hr/>
<Row>
  <Col key='1' sm={12} lg={6} md={6}>
  <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="naziv">
              <Form.Label>Naziv</Form.Label>
              <Form.Control type="text" name="naziv" required defaultValue={zadatak.naziv}/>
          </Form.Group>   
          <Form.Group controlId="pocetak">
                    <Form.Label>Početak zadatka</Form.Label>
                    <Form.Control type="date" name="pocetak"  
                    defaultValue={zadatak.pocetak}
                    />
                </Form.Group>          
          <Form.Group controlId="zavrsetak">
                    <Form.Label>Završetak zadatka</Form.Label>
                    <Form.Control type="date" name="zavrsetak"  
                    defaultValue={zadatak.zavrsetak}
                    />
                </Form.Group>

          <Form.Group className='mb-3' controlId='projekt'>
            <Form.Label>Projekt</Form.Label>
            <Form.Select
            value={projektSifra}
            onChange={(e)=>{setProjektSifra(e.target.value)}}
            >
            {projekt && projekt.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>
                 
          <Form.Group controlId="opis">
              <Form.Label>Opis zadatka</Form.Label>
              <Form.Control type="text" name="opis" required defaultValue={zadatak.opis}/>
          </Form.Group>   

    <hr/>
            <Row>
              <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RoutesNames.ZADATAK_PREGLED}
              className="btn btn-danger siroko">
              Odustani
              </Link>
              </Col>
              <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
              <Button variant="primary" type="submit" className="siroko">
                  Promjeni zadatak
              </Button>
              </Col>
          </Row>
  </Form>  
  </Col>

  <Col key='2' sm={12} lg={6} md={6}>
        <div style={{overflow: 'auto', maxHeight:'400px'}}>
        <Form.Group className='mb-3' controlId='uvjet'>
          <Form.Label>Traži djelatnika</Form.Label>
            <AsyncTypeahead
            className='autocomplete'
            id='uvjet'
            emptyLabel='Nema rezultata'
            searchText='Tražim...'
            labelKey={(djelatnik) => `${djelatnik.prezime} ${djelatnik.ime}`}
            minLength={3}
            options={pronadeniDjelatnici}
            onSearch={traziDjelatnik}
            placeholder='dio imena ili prezimena'
            renderMenuItemChildren={(djelatnik) => (
              <>
                <span>
                   {djelatnik.prezime} {djelatnik.ime}
                </span>
              </>
            )}
            onChange={dodajDjelatnika}
            ref={typeaheadRef}
            />
          </Form.Group>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Djalatnici na zadatku</th>
                <th>Akcija</th>
              </tr>
            </thead>
            <tbody>
              {djelatnik &&
                djelatnik.map((djelatnik, index) => (
                  <tr key={index}>
                    <td>
                       {djelatnik.ime} {djelatnik.prezime}
                      
                    </td>
                    <td>
                      <Button variant='danger' onClick={() =>
                          obrisiDjelatnika(djelatnik.sifra)                          
                        } >
                        <FaTrash />
                      </Button>



                      </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          </div>
        </Col>
</Row>
</Container>
);
}