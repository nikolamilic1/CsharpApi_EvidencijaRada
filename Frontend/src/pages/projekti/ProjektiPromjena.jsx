import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../Constants";
import ProjektService from "../../services/ProjektService";
import { useEffect, useState } from "react";



export default function ProjektiPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [projekt,setProjekt] = useState({});

    async function dohvatiProjekt() {
        const odgovor = await ProjektService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setProjekt(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiProjekt();
    });

    async function promjena(projekt) {
        // console.log(projekt);                  // wp4-17.09.2024  od 1:17:25
       // console.log(JSON.stringify(projekt));   //  do  1:27:00
       const odgovor = await ProjektService.promjena(routeParams.sifra,projekt);
       if(odgovor.greska){
           alert(odgovor.poruka);
           return;
       }
       navigate(RoutesNames.PROJEKT_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            naziv: podaci.get('naziv'),  // naziv je došao iz atributa name od Form.Control
            klijent: podaci.get('klijent')
        });
    }



    return(
        <Container>
            Promjena projekta
            <hr />
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>   
                    <Form.Control type="text" name="naziv" required defaultValue={projekt.naziv} />                    
                    </Form.Group>      

                    <Form.Group controlId="klijent">
                    <Form.Label>Klijent</Form.Label>   
                    <Form.Control type="text" name="klijent" required defaultValue={projekt.klijent}/>                    
                    </Form.Group>      
                    <hr />
            <Row>
                <Col xs={6} sm={6} md={3} lg={6} xxl={6}>
                <Link to={RoutesNames.PROJEKT_PREGLED}
                className="btn btn-danger siroko">
                Odustani
                </Link>                
                </Col>
                <Col xs={6} sm={6} md={9} lg={6} xxl={6}>
                <Button variant="primary" type="submit" className="siroko">
                Promjeni projekt
                </Button>
                </Col>
            </Row>
            </Form>
        </Container>
    )
}