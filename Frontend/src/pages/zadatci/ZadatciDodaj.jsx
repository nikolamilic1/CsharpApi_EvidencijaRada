import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProjektService from "../../services/ProjektService";
import Service from '../../services/ZadatakService';
import { RoutesNames } from "../../Constants";
import { Button, Col, Container, Form, Row } from "react-bootstrap";





export default function ZadatciDodaj() {
    const navigate = useNavigate();
    

    const [projekti, setProjekti] = useState([]);
    const [projektSifra, setProjektSifra] = useState(0);

   // const [zadatak, setZadatak] = useState({});

    async function dohvatiProjekte() {
        const odgovor =await ProjektService.get();
        setProjekti(odgovor);
        setProjektSifra(odgovor[0].sifra);
    }

    useEffect(()=>{
        dohvatiProjekte();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function dodaj(e) {
        const odgovor = await Service.dodaj(e);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.ZADATAK_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);


        dodaj({
            naziv: podaci.get('naziv'),
            pocetak: podaci.get('pocetak'),
           zavrsetak: podaci.get('zavrsetak'),
          projektSifra: parseInt(projektSifra),  
           opis: podaci.get('opis')
        });

    }
    return (
        <Container>
         Dodavanje novog zadatka
      <hr/>
      <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="naziv">
              <Form.Label>Naziv</Form.Label>
              <Form.Control type="text" name="naziv" required />
          </Form.Group>          

          
          <Form.Group controlId="pocetak">
                    <Form.Label>Početak:</Form.Label>
                    <Form.Control type="date" name="pocetak"  
                   // defaultValue={zadatak.pocetak}
                   />
                </Form.Group>

         
          <Form.Group controlId="zavrsetak">
                    <Form.Label>Zadatak završava:</Form.Label>
                    <Form.Control type="date" name="zavrsetak"  
                  //  defaultValue={zadatak.zavrsetak}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='projekt'>
            <Form.Label>Projekt</Form.Label>
            <Form.Select 
            onChange={(e)=>{setProjektSifra(e.target.value)}}
            >
            {projekti && projekti.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="opis">
              <Form.Label>Opis zadatka</Form.Label>
              <Form.Control type="text" name="opis" required />
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
                  Dodaj novi zadatak
              </Button>
              </Col>
          </Row>
      </Form>
        </Container>
    )
}



    














