import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjektService from "../../services/ProjektService";
import { RoutesNames } from "../../Constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import Service from '../../services/ZadatakService';
// import moment from "moment/moment";



export default function ZadaciPromjena() {

    const navigate = useNavigate();
    const routeParams = useParams();

    const [projekt, setProjekt] = useState([]);
    const [projektSifra, setProjektSifra] = useState(0);

    const [zadatak, setZadatak] = useState({});

    async function dohvatiProjekt() {
        const odgovor = await ProjektService.getBySifra(routeParams.sifra);
        setProjekt(odgovor);
    }
       // if(odgovor.greska){
         // alert(odgovor.poruka);
         // return;
      //  }
    //     odgovor.poruka.pocetak = moment.utc(odgovor.poruka.pocetak).format('yyyy-MM-DD');
    // setProjekt(odgovor.poruka);
    //}
    // useEffect(()=>{
    //   dohvatiProjekt();
    // },[]);



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


    async function dohvatiInicijalnePodatke() {
        await dohvatiProjekt();
        await dohvatiZadatak();        
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
      pocetak: parseInt(podaci.get('pocetak')),
      zavrsetak: parseInt(podaci.get('zavrsetak')),
      projektSifra: parseInt(projektSifra),
      opis: podaci.get('opis')
    });
        
  }
  return (
  <>
    Mjenjanje podataka zadatka

<Form onSubmit={obradiSubmit}>
          <Form.Group controlId="naziv">
              <Form.Label>Naziv</Form.Label>
              <Form.Control type="text" name="naziv" required defaultValue={zadatak.naziv}/>
          </Form.Group>          
          <Form.Group controlId="pocetak">
                    <Form.Label>Izvodi se od</Form.Label>
                    <Form.Control type="date" name="pocetak"  
                    defaultValue={zadatak.pocetak}/>
                </Form.Group>          
          <Form.Group controlId="zavrsetak">
                    <Form.Label>Izvodi se od</Form.Label>
                    <Form.Control type="date" name="zavrsetak"  
                    defaultValue={zadatak.zavrsetak}/>
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

          <hr />
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
</>
);



}